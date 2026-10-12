import { useEffect, useRef, useState } from "react";

import { projects } from "@/data/projects";
import { useT } from "@/i18n/context";

/** Timeline, in ms from the start of the intro. */
const WELCOME_MS = 4000; // the welcome line and the photos, then the curtain lifts
const CV_HOLD_MS = 1000; // on the CV (with the glide below, the CV gets 2 seconds)
const TO_PROJECTS_MS = 1000; // glide up from the CV to the engineering projects
const HOLD_MS = 3000; // on the engineering projects (with the glide below, they get 4 seconds)
const TO_TOP_MS = 1000; // glide up to the introduction
const TOTAL_MS = WELCOME_MS + CV_HOLD_MS + TO_PROJECTS_MS + HOLD_MS + TO_TOP_MS; // 10 seconds
const SEEN_KEY = "intro-seen";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const INPUT_EVENTS = ["wheel", "touchstart", "keydown"] as const;

/** Seconds per loop for each row. They differ for depth, and all are short enough that every
 *  photo in a row has crossed the screen by the time the welcome ends. */
const ROW_SECONDS = [7.6, 7.0, 6.4];

/**
 * Every photo of every project (the main photo and the whole gallery), once each, dealt out
 * across three rows so that neighbouring tiles come from different projects.
 */
function introRows(): string[][] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  const depth = Math.max(...projects.map((p) => 1 + p.gallery.length));
  for (let k = 0; k < depth; k++) {
    for (const p of projects) {
      const photo = [p.image, ...p.gallery][k];
      if (photo && !seen.has(photo)) {
        seen.add(photo);
        ordered.push(photo);
      }
    }
  }
  const rows: string[][] = [[], [], []];
  ordered.forEach((src, i) => rows[i % rows.length]!.push(src));
  return rows;
}

/** A photo that fails to load leaves a plain tile rather than a broken-image icon. */
const hideBroken = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};

/**
 * A short, once-per-session opening, in the site's own look.
 *   1. "Welcome to Aurélien's ePortfolio" over three rows holding every project photo, gliding
 *      left to right.
 *   2. The curtain lifts on the CV at the foot of the page, which then scrolls up, pauses on the
 *      engineering projects, and carries on up to the introduction (10 seconds in all).
 *
 * Whether it runs is decided before first paint by a script in the document head (the
 * `intro-pending` class), so the page never flashes behind the curtain. Scrolling, touching,
 * pressing a key or the Skip button ends it at once.
 */
export function IntroSequence() {
  const t = useT();
  const curtainRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<(() => void) | null>(null);
  // Null until the intro's clock actually starts, so the number never sits frozen while the page loads.
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* the intro may simply run again on the next visit */
    }

    const timers: number[] = [];
    const startedAt = performance.now();
    const tick = window.setInterval(
      () =>
        setSecondsLeft(Math.max(0, Math.ceil((TOTAL_MS - (performance.now() - startedAt)) / 1000))),
      200,
    );
    let frame = 0;
    let done = false;

    // Photos that failed before the page hydrated never fire onError, so sweep for them.
    const sweepBroken = () =>
      curtainRef.current?.querySelectorAll<HTMLImageElement>(".intro-tile img").forEach((img) => {
        if (img.complete && img.naturalWidth === 0) img.style.visibility = "hidden";
      });
    sweepBroken();
    timers.push(window.setTimeout(sweepBroken, 500), window.setTimeout(sweepBroken, 1500));
    let curtainUp = false;
    let lastSet = window.scrollY;

    const jump = (y: number) => {
      lastSet = Math.round(y);
      window.scrollTo({ top: lastSet, behavior: "instant" });
    };
    const docY = (id: string) => {
      const el = document.getElementById(id);
      return el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY) : 0;
    };

    const liftCurtain = () => {
      curtainUp = true;
      curtainRef.current?.classList.add("is-leaving");
    };

    const finish = (how: "leave" | "top" = "leave") => {
      if (done) return;
      done = true;
      clearInterval(tick);
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      for (const type of INPUT_EVENTS) window.removeEventListener(type, onInput);
      if (!curtainUp) {
        // The visitor never saw the page: it should open on the introduction.
        jump(0);
        liftCurtain();
      } else if (how === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.setTimeout(() => root.classList.remove("intro-pending"), 900);
    };
    const onInput = () => finish("leave");
    skipRef.current = () => finish("top");
    for (const type of INPUT_EVENTS) window.addEventListener(type, onInput, { passive: true });

    // Glide the page to `to` over `ms`; hands over if anyone else moves the page.
    const glide = (to: number, ms: number, then: () => void) => {
      const from = window.scrollY;
      const begin = performance.now();
      const step = (now: number) => {
        if (done) return;
        if (Math.abs(window.scrollY - lastSet) > 3) return finish("leave");
        const p = Math.min(1, (now - begin) / ms);
        jump(from + (to - from) * easeInOutCubic(p));
        if (p < 1) frame = requestAnimationFrame(step);
        else then();
      };
      frame = requestAnimationFrame(step);
    };

    // Behind the curtain, park the page on the CV so the first thing revealed is the CV.
    const cvY = Math.max(0, docY("cv") - 72);
    jump(cvY);

    timers.push(
      window.setTimeout(() => {
        liftCurtain();
        timers.push(
          window.setTimeout(() => {
            glide(docY("projects"), TO_PROJECTS_MS, () => {
              timers.push(
                window.setTimeout(() => glide(0, TO_TOP_MS, () => finish("leave")), HOLD_MS),
              );
            });
          }, CV_HOLD_MS),
        );
      }, WELCOME_MS),
    );

    return () => {
      done = true;
      clearInterval(tick);
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      for (const type of INPUT_EVENTS) window.removeEventListener(type, onInput);
      root.classList.remove("intro-pending");
    };
  }, []);

  const rows = introRows();

  return (
    <>
      <div ref={curtainRef} className="intro-curtain" aria-hidden="true">
        <div className="intro-title text-gradient text-5xl font-bold tracking-tight sm:text-7xl">
          {t.introWelcome}
        </div>
        <div className="intro-marquee">
          {rows.map((row, r) => (
            <div
              key={r}
              className="intro-row"
              style={{ ["--dur" as string]: `${ROW_SECONDS[r % ROW_SECONDS.length]}s` }}
            >
              {[...row, ...row].map((src, i) => (
                <div key={i} className="intro-tile">
                  <img src={src} alt="" loading="eager" decoding="async" onError={hideBroken} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="intro-skip">
        <span className="intro-count" aria-hidden="true" hidden={secondsLeft === null}>
          {secondsLeft}s
        </span>
        <button type="button" className="intro-skip-btn" onClick={() => skipRef.current?.()}>
          {t.skipIntro}
        </button>
      </div>
    </>
  );
}
