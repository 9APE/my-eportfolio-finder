// Invite-only gate. Runs in the Worker before the app renders.
//
// Off by default: with no ACCESS_SECRET configured the site stays public, so
// merging this can never lock the owner out or break Lovable previews.
//
// Env (Cloudflare secrets / vars):
//   ACCESS_SECRET  signing key for cookies and approve links (enables the gate)
//   ACCESS_LINKS   optional private links, "name:token,name2:token2"; open /?k=token
//   ACCESS_KV      optional KV namespace; enables the "Request access" flow
//   ACCESS_OWNER   optional label shown in notifications (defaults to the site host)

type KV = {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
};

type AccessEnv = {
  ACCESS_SECRET?: string;
  ACCESS_LINKS?: string;
  ACCESS_KV?: KV;
};

const COOKIE = "pf_access";
const COOKIE_DAYS = 30;
const REQUEST_TTL_S = 60 * 60 * 24 * 7;
const WEB3FORMS_KEY = "b566c164-ac8d-4287-b322-130930e8ba60";
const enc = new TextEncoder();

const toHex = (buf: ArrayBuffer) =>
  [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");

async function sign(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function parseLinks(env: AccessEnv): Map<string, string> {
  const out = new Map<string, string>();
  for (const part of (env.ACCESS_LINKS ?? "").split(",")) {
    const i = part.indexOf(":");
    if (i > 0) out.set(part.slice(0, i).trim(), part.slice(i + 1).trim());
  }
  return out;
}

function readCookie(request: Request): string | null {
  const raw = request.headers.get("cookie") ?? "";
  for (const part of raw.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === COOKIE) return v.join("=");
  }
  return null;
}

// Cookie value: kind.id.expiry.signature  (kind = "link" | "req")
async function makeCookie(secret: string, kind: "link" | "req", id: string): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + COOKIE_DAYS * 86400;
  const body = `${kind}.${id}.${exp}`;
  const sig = await sign(secret, body);
  const value = encodeURIComponent(`${body}.${sig}`);
  return `${COOKIE}=${value}; Path=/; Max-Age=${COOKIE_DAYS * 86400}; HttpOnly; Secure; SameSite=Lax`;
}

async function cookieIsValid(request: Request, env: AccessEnv): Promise<boolean> {
  const raw = readCookie(request);
  if (!raw || !env.ACCESS_SECRET) return false;
  const parts = decodeURIComponent(raw).split(".");
  if (parts.length !== 4) return false;
  const [kind = "", id = "", exp = "", sig = ""] = parts;
  if (Number(exp) < Date.now() / 1000) return false;
  const expected = await sign(env.ACCESS_SECRET, `${kind}.${id}.${exp}`);
  if (!safeEqual(expected, sig)) return false;
  // Revocation: removing a link from ACCESS_LINKS or a grant from KV ends the session.
  if (kind === "link") return parseLinks(env).has(id);
  if (kind === "req") return (await env.ACCESS_KV?.get(`ok:${id}`)) != null;
  return false;
}

const clip = (s: unknown, n: number) =>
  String(s ?? "")
    .trim()
    .slice(0, n);

function page(body: string, status = 200, headers: Record<string, string> = {}): Response {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow,noarchive" />
<title>Private ePortfolio</title>
<style>
  :root { color-scheme: light; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:1.5rem; box-sizing:border-box;
    font:15px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif; color:#0f172a;
    background: radial-gradient(60rem 40rem at 5% 0%, #cdeff0 0, transparent 60%),
                radial-gradient(50rem 40rem at 100% 30%, #d3e4f7 0, transparent 60%), #f6fafb; }
  .card { width:100%; max-width:26rem; background:rgba(255,255,255,.72); backdrop-filter:blur(14px);
    border:1px solid rgba(15,23,42,.08); border-radius:1.25rem; padding:1.75rem; box-shadow:0 20px 50px -25px rgba(15,23,42,.35); }
  h1 { font-size:1.2rem; margin:0 0 .35rem; letter-spacing:-.01em; }
  p { margin:0 0 1rem; color:#475569; }
  label { display:block; font-size:.78rem; font-weight:600; color:#334155; margin:.7rem 0 .25rem; }
  input, textarea { width:100%; box-sizing:border-box; font:inherit; padding:.6rem .75rem; border-radius:.7rem;
    border:1px solid #cbd5e1; background:#fff; }
  input:focus, textarea:focus { outline:2px solid #5eb8c4; outline-offset:1px; }
  button { margin-top:1rem; width:100%; font:inherit; font-weight:600; padding:.7rem 1rem; border:0; border-radius:.8rem;
    background:#0f172a; color:#fff; cursor:pointer; }
  button:disabled { opacity:.6; cursor:default; }
  .note { font-size:.75rem; color:#64748b; margin:.9rem 0 0; }
  .status { font-weight:600; color:#0f172a; }
</style></head><body><div class="card">${body}</div></body></html>`;
  return new Response(html, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
      ...headers,
    },
  });
}

function gatePage(canRequest: boolean): Response {
  if (!canRequest) {
    return page(
      `<h1>Private ePortfolio</h1>
       <p>This portfolio is shared by invitation. Please use the private link you were given.</p>`,
      401,
    );
  }
  return page(
    `<h1>Private ePortfolio</h1>
     <p>This portfolio is shared by invitation. Request access and you will be let in as soon as it is approved.</p>
     <form id="f">
       <label for="n">Your name</label><input id="n" name="name" required maxlength="100" autocomplete="name" />
       <label for="e">Email</label><input id="e" name="email" type="email" required maxlength="200" autocomplete="email" />
       <label for="c">Company or school</label><input id="c" name="org" maxlength="150" autocomplete="organization" />
       <label for="m">Note (optional)</label><textarea id="m" name="note" rows="2" maxlength="400"></textarea>
       <button id="b" type="submit">Request access</button>
     </form>
     <p class="note">Your name, email and approximate location (from your network) are sent to the owner so they can approve you.</p>
     <p id="s" class="status" role="status" aria-live="polite"></p>
     <script>
     (function(){
       var f=document.getElementById('f'),s=document.getElementById('s'),b=document.getElementById('b');
       var KEY='pf_req';
       function poll(id){
         s.textContent='Waiting for approval. You can keep this tab open.';
         var t=setInterval(function(){
           fetch('/__access/status?id='+encodeURIComponent(id),{credentials:'same-origin'}).then(function(r){return r.json()}).then(function(d){
             if(d.state==='approved'){clearInterval(t);s.textContent='Approved. Opening...';location.replace('/');}
             else if(d.state==='denied'){clearInterval(t);try{localStorage.removeItem(KEY)}catch(e){}s.textContent='Sorry, this request was declined.';}
           }).catch(function(){});
         },4000);
       }
       try{var old=localStorage.getItem(KEY);if(old){f.hidden=true;poll(old);}}catch(e){}
       f.addEventListener('submit',function(ev){
         ev.preventDefault();b.disabled=true;s.textContent='Sending...';
         fetch('/__access/request',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({
           name:f.name.value,email:f.email.value,org:f.org.value,note:f.note.value})})
         .then(function(r){return r.json()}).then(function(d){
           if(!d.id){throw 0}
           try{localStorage.setItem(KEY,d.id)}catch(e){}
           f.hidden=true;poll(d.id);
         }).catch(function(){b.disabled=false;s.textContent='Something went wrong. Please try again.';});
       });
     })();
     </script>`,
    401,
  );
}

const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...headers },
  });

async function notifyOwner(
  request: Request,
  id: string,
  who: { name: string; email: string; org: string; note: string },
  env: AccessEnv,
) {
  const url = new URL(request.url);
  const secret = env.ACCESS_SECRET!;
  const link = async (a: "approve" | "deny") =>
    `${url.origin}/__access/decide?id=${id}&a=${a}&sig=${await sign(secret, `decide.${id}.${a}`)}`;
  const cf =
    (request as Request & { cf?: { city?: string; region?: string; country?: string } }).cf ?? {};
  const place =
    [cf.city, cf.region, cf.country].filter(Boolean).join(", ") ||
    request.headers.get("cf-ipcountry") ||
    "unknown";
  const message = [
    "Someone is requesting access to your ePortfolio.",
    "",
    `Name: ${who.name}`,
    `Email: ${who.email}`,
    `Company/school: ${who.org || "not given"}`,
    `Note: ${who.note || "none"}`,
    "",
    `Approximate location (from IP, can be inaccurate): ${place}`,
    `IP: ${request.headers.get("cf-connecting-ip") ?? "unknown"}`,
    `Browser: ${clip(request.headers.get("user-agent"), 160)}`,
    "",
    `APPROVE: ${await link("approve")}`,
    `DENY: ${await link("deny")}`,
  ].join("\n");
  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Access request: ${who.name}${who.org ? ` (${who.org})` : ""}`,
      from_name: "ePortfolio access",
      email: "no-reply@eportfolioaurelien.today",
      message,
    }),
  });
}

/**
 * Returns a Response when the gate handles the request, or null to let the app render.
 */
export async function accessGate(request: Request, rawEnv: unknown): Promise<Response | null> {
  const env = (rawEnv ?? {}) as AccessEnv;
  if (!env.ACCESS_SECRET) return null; // gate disabled
  const url = new URL(request.url);
  const kv = env.ACCESS_KV;
  const secret = env.ACCESS_SECRET;

  // Owner's approve/deny link (signed, no cookie needed).
  if (url.pathname === "/__access/decide" && kv) {
    const id = clip(url.searchParams.get("id"), 64);
    const action = url.searchParams.get("a");
    const sig = url.searchParams.get("sig") ?? "";
    if (!id || (action !== "approve" && action !== "deny"))
      return page("<h1>Invalid link</h1>", 400);
    if (!safeEqual(await sign(secret, `decide.${id}.${action}`), sig)) {
      return page("<h1>Invalid link</h1>", 403);
    }
    if (!(await kv.get(`req:${id}`))) {
      return page(
        "<h1>Request not found</h1><p>It may have expired or already been handled.</p>",
        404,
      );
    }
    if (action === "approve") {
      await kv.put(`ok:${id}`, "1");
      await kv.delete(`req:${id}`);
      return page("<h1>Approved</h1><p>The visitor will be let in automatically.</p>");
    }
    await kv.put(`no:${id}`, "1", { expirationTtl: REQUEST_TTL_S });
    await kv.delete(`req:${id}`);
    return page("<h1>Declined</h1><p>The visitor has been told the request was declined.</p>");
  }

  if (await cookieIsValid(request, env)) return null;

  // Private link: /?k=token  ->  set cookie, drop the token from the URL.
  const k = url.searchParams.get("k");
  if (k) {
    for (const [name, token] of parseLinks(env)) {
      if (token && safeEqual(token, k)) {
        url.searchParams.delete("k");
        return new Response(null, {
          status: 302,
          headers: {
            location: url.pathname + url.search,
            "set-cookie": await makeCookie(secret, "link", name),
            "cache-control": "no-store",
          },
        });
      }
    }
  }

  if (url.pathname === "/__access/request" && request.method === "POST" && kv) {
    let body: Record<string, unknown> = {};
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return json({ error: "bad request" }, 400);
    }
    const who = {
      name: clip(body["name"], 100),
      email: clip(body["email"], 200),
      org: clip(body["org"], 150),
      note: clip(body["note"], 400),
    };
    if (!who.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(who.email)) {
      return json({ error: "name and a valid email are required" }, 400);
    }
    // Light abuse guard: one pending request per IP per minute.
    const ip = request.headers.get("cf-connecting-ip") ?? "anon";
    const rl = `rl:${ip}`;
    if (await kv.get(rl)) return json({ error: "slow down" }, 429);
    await kv.put(rl, "1", { expirationTtl: 60 });
    const id = crypto.randomUUID();
    await kv.put(`req:${id}`, JSON.stringify(who), { expirationTtl: REQUEST_TTL_S });
    try {
      await notifyOwner(request, id, who, env);
    } catch (e) {
      console.error("access notify failed", e);
    }
    return json({ id });
  }

  if (url.pathname === "/__access/status" && kv) {
    const id = clip(url.searchParams.get("id"), 64);
    if (id && (await kv.get(`ok:${id}`))) {
      return json({ state: "approved" }, 200, {
        "set-cookie": await makeCookie(secret, "req", id),
      });
    }
    if (id && (await kv.get(`no:${id}`))) return json({ state: "denied" });
    return json({ state: "pending" });
  }

  const gated = gatePage(!!kv);
  return request.method === "HEAD" || request.method === "GET"
    ? gated
    : new Response("Forbidden", { status: 403 });
}
