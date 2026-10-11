// Cookie-free visit logging, a daily e-mail digest and a small owner dashboard.
//
// Everything is optional: with no D1 binding (`DB`) nothing is recorded and the
// site behaves exactly as before.
//
// Env (Cloudflare bindings / secrets):
//   DB              D1 database (table is created on first use)
//   ADMIN_KEY       secret for /admin (enables the dashboard and manual digest)
//   RESEND_API_KEY  sends the digest through Resend (falls back to web3forms)
//   VISIT_SALT      extra secret mixed into the daily visitor hash
//   DIGEST_TO       recipient (default ariimoanapons@gmail.com)
//   DIGEST_TZ       time zone for times in the email (default Australia/Darwin)

type D1Statement = {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<unknown>;
  all<T = Record<string, unknown>>(): Promise<{ results: T[] }>;
};
type D1 = { prepare(sql: string): D1Statement };

export type VisitEnv = {
  DB?: D1;
  ADMIN_KEY?: string;
  RESEND_API_KEY?: string;
  VISIT_SALT?: string;
  DIGEST_TO?: string;
  DIGEST_TZ?: string;
};

type Ctx = { waitUntil(p: Promise<unknown>): void } | undefined;

export type Visit = {
  ts: string;
  visitor: string;
  kind: string;
  path: string;
  country: string;
  region: string;
  city: string;
  org: string;
  referrer: string;
  device: string;
  lang: string;
  tag: string;
};

const BOT =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|node-fetch|axios|go-http|java\//i;
const OWNER_COOKIE = "pf_me";
const WEB3FORMS_KEY = "b566c164-ac8d-4287-b322-130930e8ba60";
const enc = new TextEncoder();

const clip = (s: unknown, n: number) =>
  String(s ?? "")
    .trim()
    .slice(0, n);

export const escapeHtml = (s: unknown) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string,
  );

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sha256Hex(data: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(data));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hasCookie(request: Request, name: string): boolean {
  return (request.headers.get("cookie") ?? "")
    .split(";")
    .some((part) => part.trim().startsWith(`${name}=`));
}

function describeDevice(ua: string): string {
  const os = /iPhone|iPad|iOS/i.test(ua)
    ? "iOS"
    : /Android/i.test(ua)
      ? "Android"
      : /Windows/i.test(ua)
        ? "Windows"
        : /Mac OS X|Macintosh/i.test(ua)
          ? "macOS"
          : /Linux/i.test(ua)
            ? "Linux"
            : "Other";
  const browser = /Edg\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /Chrome\//.test(ua)
        ? "Chrome"
        : /Firefox\//.test(ua)
          ? "Firefox"
          : /Safari\//.test(ua)
            ? "Safari"
            : "Browser";
  const kind = /Mobi|iPhone|Android.*Mobile/i.test(ua)
    ? "phone"
    : /iPad|Tablet/i.test(ua)
      ? "tablet"
      : "desktop";
  return `${browser} on ${os} (${kind})`;
}

let schemaReady: Promise<unknown> | undefined;
function ensureSchema(db: D1) {
  schemaReady ??= db
    .prepare(
      "CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, ts TEXT NOT NULL, visitor TEXT, kind TEXT, path TEXT, country TEXT, region TEXT, city TEXT, org TEXT, referrer TEXT, device TEXT, lang TEXT, tag TEXT)",
    )
    .run()
    .then(() => db.prepare("CREATE INDEX IF NOT EXISTS visits_ts ON visits (ts)").run());
  return schemaReady;
}

/** True for requests worth logging: real page loads, not assets, bots or the owner. */
function shouldRecord(request: Request, path: string, kind: "load" | "nav"): boolean {
  if (BOT.test(request.headers.get("user-agent") ?? "")) return false;
  if (request.headers.get("dnt") === "1") return false;
  if (hasCookie(request, OWNER_COOKIE)) return false;
  if (path.startsWith("/__") || path.startsWith("/admin") || path.startsWith("/assets/"))
    return false;
  if (kind === "load") {
    if (request.method !== "GET") return false;
    if (!(request.headers.get("accept") ?? "").includes("text/html")) return false;
    if (/\.[a-z0-9]{2,5}$/i.test(path)) return false;
  }
  return true;
}

async function record(
  request: Request,
  env: VisitEnv,
  path: string,
  kind: "load" | "nav",
  tag: string,
) {
  const db = env.DB;
  if (!db) return;
  const cf = (request as Request & { cf?: Record<string, unknown> }).cf ?? {};
  const ua = request.headers.get("user-agent") ?? "";
  const now = new Date();
  // Daily-rotating hash: counts unique visitors per day without storing the IP.
  const visitor = (
    await sha256Hex(
      `${request.headers.get("cf-connecting-ip") ?? ""}|${ua}|${now.toISOString().slice(0, 10)}|${env.VISIT_SALT ?? ""}`,
    )
  ).slice(0, 10);
  let referrer = "";
  try {
    const ref = request.headers.get("referer");
    if (ref) referrer = new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    /* malformed referer */
  }
  await ensureSchema(db);
  await db
    .prepare(
      "INSERT INTO visits (ts, visitor, kind, path, country, region, city, org, referrer, device, lang, tag) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
    )
    .bind(
      now.toISOString(),
      visitor,
      kind,
      clip(path, 200),
      clip(cf["country"], 8),
      clip(cf["region"], 80),
      clip(cf["city"], 80),
      clip(cf["asOrganization"], 120),
      clip(referrer, 120),
      describeDevice(ua),
      clip((request.headers.get("accept-language") ?? "").split(",")[0], 12),
      clip(tag, 60),
    )
    .run();
}

/** Call for every request. Never throws and never delays the response. */
export function trackVisit(request: Request, env: unknown, ctx: Ctx): void {
  try {
    const e = (env ?? {}) as VisitEnv;
    if (!e.DB) return;
    const url = new URL(request.url);
    if (!shouldRecord(request, url.pathname, "load")) return;
    const job = record(request, e, url.pathname, "load", url.searchParams.get("k") ?? "").catch(
      (err) => console.error("visit log failed", err),
    );
    ctx?.waitUntil(job);
  } catch (err) {
    console.error("visit log failed", err);
  }
}

/** Handles the in-site navigation beacon (POST /__v). Returns null for other requests. */
export async function handleBeacon(
  request: Request,
  env: unknown,
  ctx: Ctx,
): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== "/__v") return null;
  const e = (env ?? {}) as VisitEnv;
  try {
    if (request.method === "POST" && e.DB) {
      const body = (await request.json()) as { p?: unknown };
      const path = clip(body.p, 200);
      if (path.startsWith("/") && shouldRecord(request, path, "nav")) {
        const job = record(request, e, path, "nav", "").catch((err) =>
          console.error("visit log failed", err),
        );
        ctx?.waitUntil(job);
      }
    }
  } catch {
    /* ignore malformed beacons */
  }
  return new Response(null, { status: 204 });
}

// ---------- reading, grouping, e-mail ----------

async function loadVisits(db: D1, sinceMs: number): Promise<Visit[]> {
  await ensureSchema(db);
  const since = new Date(Date.now() - sinceMs).toISOString();
  const { results } = await db
    .prepare(
      "SELECT ts, visitor, kind, path, country, region, city, org, referrer, device, lang, tag FROM visits WHERE ts >= ? ORDER BY ts ASC LIMIT 5000",
    )
    .bind(since)
    .all<Visit>();
  return results;
}

export type Group = {
  visitor: string;
  first: string;
  last: string;
  place: string;
  org: string;
  referrer: string;
  device: string;
  lang: string;
  tag: string;
  pages: string[];
};

export function groupVisits(rows: Visit[]): Group[] {
  const map = new Map<string, Group>();
  for (const r of rows) {
    // A hash is per day, so the same person on two days is two groups.
    const key = `${r.visitor}|${r.ts.slice(0, 10)}`;
    let g = map.get(key);
    if (!g) {
      g = {
        visitor: r.visitor,
        first: r.ts,
        last: r.ts,
        place: [r.city, r.region, r.country].filter(Boolean).join(", ") || "Unknown",
        org: r.org,
        referrer: r.referrer,
        device: r.device,
        lang: r.lang,
        tag: r.tag,
        pages: [],
      };
      map.set(key, g);
    }
    g.last = r.ts;
    if (r.tag && !g.tag) g.tag = r.tag;
    if (r.referrer && !g.referrer) g.referrer = r.referrer;
    if (!g.pages.includes(r.path)) g.pages.push(r.path);
  }
  return [...map.values()].sort((a, b) => a.first.localeCompare(b.first));
}

const fmtTime = (iso: string, tz: string) =>
  new Intl.DateTimeFormat("en-AU", {
    timeZone: tz,
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

const pageLabel = (p: string) =>
  p === "/" ? "Home" : p.replace(/^\/projects\//, "Project: ").replace(/^\//, "");

function topCounts(values: string[], n = 5): [string, number][] {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

export function renderVisitors(groups: Group[], tz: string): { text: string; html: string } {
  if (groups.length === 0) {
    return { text: "No visitors in this period.", html: "<p>No visitors in this period.</p>" };
  }
  const text = groups
    .map((g, i) =>
      [
        `${i + 1}. ${g.tag ? `[${g.tag}] ` : ""}${g.place}${g.org ? ` · ${g.org}` : ""}`,
        `   ${fmtTime(g.first, tz)} · ${g.device} · ${g.lang || "?"}`,
        `   From: ${g.referrer || "direct"} · Viewed: ${g.pages.map(pageLabel).join(", ")}`,
      ].join("\n"),
    )
    .join("\n\n");
  const rows = groups
    .map(
      (g) => `<tr>
<td>${escapeHtml(fmtTime(g.first, tz))}</td>
<td><b>${escapeHtml(g.place)}</b>${g.org ? `<br><span class="m">${escapeHtml(g.org)}</span>` : ""}${g.tag ? `<br><span class="t">${escapeHtml(g.tag)}</span>` : ""}</td>
<td>${escapeHtml(g.referrer || "direct")}</td>
<td>${escapeHtml(g.device)}<br><span class="m">${escapeHtml(g.lang)}</span></td>
<td>${g.pages.map((p) => escapeHtml(pageLabel(p))).join("<br>")}</td></tr>`,
    )
    .join("");
  const html = `<table><thead><tr><th>Time</th><th>Where</th><th>From</th><th>Device</th><th>Viewed</th></tr></thead><tbody>${rows}</tbody></table>`;
  return { text, html };
}

const STYLE = `body{font:14px/1.5 system-ui,-apple-system,sans-serif;color:#0f172a;margin:0;padding:24px;background:#f6fafb}
h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:24px 0 8px}.m{color:#64748b;font-size:12px}.t{background:#0f172a;color:#fff;border-radius:999px;padding:1px 8px;font-size:11px}
table{border-collapse:collapse;width:100%;background:#fff;border-radius:12px;overflow:hidden}th,td{text-align:left;padding:8px 10px;border-bottom:1px solid #e2e8f0;vertical-align:top;font-size:13px}
th{background:#eef5f7;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#475569}.cards{display:flex;gap:12px;flex-wrap:wrap}.card{background:#fff;border-radius:12px;padding:12px 16px;min-width:120px}.card b{font-size:22px;display:block}
a{color:#0f766e}ul{margin:0;padding-left:18px}`;

function summaryHtml(groups: Group[], rows: Visit[]): string {
  const countries = topCounts(groups.map((g) => g.place.split(", ").pop() ?? ""));
  const refs = topCounts(groups.map((g) => g.referrer || "direct"));
  const projects = topCounts(
    rows.filter((r) => r.path.startsWith("/projects/")).map((r) => pageLabel(r.path)),
  );
  const list = (items: [string, number][]) =>
    items.length
      ? `<ul>${items.map(([k, v]) => `<li>${escapeHtml(k)} (${v})</li>`).join("")}</ul>`
      : '<span class="m">none</span>';
  return `<div class="cards"><div class="card"><b>${groups.length}</b>visitors</div><div class="card"><b>${rows.length}</b>page views</div></div>
<h2>Top countries</h2>${list(countries)}<h2>Top sources</h2>${list(refs)}<h2>Most viewed projects</h2>${list(projects)}`;
}

export async function buildDigest(env: VisitEnv, windowMs: number) {
  const tz = env.DIGEST_TZ ?? "Australia/Darwin";
  const rows = env.DB ? await loadVisits(env.DB, windowMs) : [];
  const groups = groupVisits(rows);
  const { text, html } = renderVisitors(groups, tz);
  const label =
    windowMs <= 86_400_000 ? "last 24 hours" : `last ${Math.round(windowMs / 86_400_000)} days`;
  return {
    subject: `ePortfolio: ${groups.length} visitor${groups.length === 1 ? "" : "s"} (${label})`,
    text: `${groups.length} visitors, ${rows.length} page views (${label})\n\n${text}`,
    html: `<!doctype html><meta charset="utf-8"><style>${STYLE}</style><h1>ePortfolio visitors</h1><div class="m">${label} · times in ${escapeHtml(tz)}</div>${summaryHtml(groups, rows)}<h2>Visitors</h2>${html}`,
    groups,
    rows,
  };
}

export async function sendDigest(env: VisitEnv): Promise<{ ok: boolean; detail: string }> {
  const digest = await buildDigest(env, 86_400_000);
  const to = env.DIGEST_TO ?? "ariimoanapons@gmail.com";
  if (env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "ePortfolio <onboarding@resend.dev>",
        to: [to],
        subject: digest.subject,
        html: digest.html,
        text: digest.text,
      }),
    });
    return { ok: res.ok, detail: `resend ${res.status}` };
  }
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: digest.subject,
      from_name: "ePortfolio visitors",
      email: "no-reply@eportfolioaurelien.today",
      message: digest.text,
    }),
  });
  return { ok: res.ok, detail: `web3forms ${res.status}` };
}

/** Scheduled (cron) entry point. */
export async function runDailyDigest(env: unknown): Promise<void> {
  const e = (env ?? {}) as VisitEnv;
  if (!e.DB) return;
  const result = await sendDigest(e);
  if (!result.ok) console.error("digest failed", result.detail);
}

// ---------- owner dashboard ----------

/** /admin?key=...[&days=1|7|30]  and  /admin/digest?key=...[&send=1]. Null for other paths. */
export async function handleAdmin(request: Request, env: unknown): Promise<Response | null> {
  const url = new URL(request.url);
  if (url.pathname !== "/admin" && url.pathname !== "/admin/digest") return null;
  const e = (env ?? {}) as VisitEnv;
  const headers = {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-robots-tag": "noindex, nofollow",
  };
  const key = url.searchParams.get("key") ?? "";
  if (!e.ADMIN_KEY || !safeEqual(e.ADMIN_KEY, key)) {
    return new Response("Not found", { status: 404, headers });
  }
  // Mark this browser as the owner so your own visits are not logged.
  const own = `${OWNER_COOKIE}=1; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`;
  if (!e.DB) {
    return new Response(
      `<!doctype html><meta charset="utf-8"><style>${STYLE}</style><h1>Dashboard</h1><p>No database is connected yet. Bind a D1 database named <b>DB</b>.</p>`,
      {
        headers: { ...headers, "set-cookie": own },
      },
    );
  }
  if (url.pathname === "/admin/digest") {
    const digest = await buildDigest(e, 86_400_000);
    let note = "Preview only. Add &send=1 to e-mail it now.";
    if (url.searchParams.get("send") === "1") {
      const r = await sendDigest(e);
      note = r.ok ? `Sent (${r.detail}).` : `Send failed (${r.detail}).`;
    }
    return new Response(
      `${digest.html.replace("<h1>", `<p class="m">${escapeHtml(note)}</p><h1>`)}`,
      {
        headers: { ...headers, "set-cookie": own },
      },
    );
  }
  const days = [1, 7, 30].includes(Number(url.searchParams.get("days")))
    ? Number(url.searchParams.get("days"))
    : 7;
  const digest = await buildDigest(e, days * 86_400_000);
  const k = encodeURIComponent(key);
  const nav = [1, 7, 30]
    .map((d) => `<a href="/admin?key=${k}&days=${d}">${d === 1 ? "24h" : `${d} days`}</a>`)
    .join(" · ");
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Visitors</title><style>${STYLE}</style></head><body>
<h1>ePortfolio visitors</h1><div class="m">${nav} · <a href="/admin/digest?key=${k}">preview daily e-mail</a></div>
${summaryHtml(digest.groups, digest.rows)}<h2>Visitors (newest last)</h2>${renderVisitors(digest.groups, e.DIGEST_TZ ?? "Australia/Darwin").html}</body></html>`;
  return new Response(page, { headers: { ...headers, "set-cookie": own } });
}
