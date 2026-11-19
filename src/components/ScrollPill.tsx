import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/use-in-view";

/** How long the page must sit still before it offers a nudge. */
const IDLE_MS = 5000;
/** Size of the nudge: far enough to peek at the black projects band below the introduction. */
const nudgeDistance = () => Math.round(Math.min(150, Math.max(90, window.innerHeight * 0.15)));

type Mode = "top" | "cv" | "none";

/**
 * Where the visitor is, and so what the pill should say.
 * - top:  still in the hero, so it points down to the projects.
 * - cv:   inside the project index (or at its end), so it points on to the CV.
 * - none: anywhere else, including once the CV itself is on screen.
 */
function readMode(): Mode {
  if (window.scrollY <= 80) return "top";
  const vh = window.innerHeight;
  const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top;
  const projectsTop = top("projects");
  const cvTop = top("cv");
  if (projectsTop === undefined || cvTop === undefined) return "none";
  const inProjects = projectsTop < vh * 0.5 && cvTop > vh * 0.6;
  return inProjects ? "cv" : "none";
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A short scroll down and back, as a physical hint that the page continues. Returns a
 * cancel function. It gives way the moment the visitor touches anything: user input
 * cancels it, and so does the scroll position moving away from where the animation put it.
 */
function nudge(onDone: () => void): () => void {
  const startY = window.scrollY;
  const NUDGE_PX = nudgeDistance();
  const down = 1100;
  const hold = 600;
  const up = 1300;
  const bounces = 2;
  const gap = 500;
  const one = down + hold + up + gap;
  const total = one * bounces - gap;
  const begin = performance.now();
  let frame = 0;
  let lastSet = startY;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    cancelAnimationFrame(frame);
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.removeEventListener(type, finish);
    }
    onDone();
  };

  const step = (now: number) => {
    if (finished) return;
    // Someone else moved the page (scrollbar drag, anchor jump): leave it where they put it.
    if (Math.abs(window.scrollY - lastSet) > 2) return finish();
    const elapsed = now - begin;
    let y = startY;
    const t = elapsed % one;
    if (elapsed >= total) y = startY;
    else if (t < down) y = startY + NUDGE_PX * easeOutCubic(t / down);
    else if (t < down + hold) y = startY + NUDGE_PX;
    else if (t < down + hold + up)
      y = startY + NUDGE_PX * (1 - easeInOutCubic((t - down - hold) / up));
    lastSet = Math.round(y);
    window.scrollTo({ top: lastSet, behavior: "instant" });
    if (elapsed >= total) return finish();
    frame = requestAnimationFrame(step);
  };

  for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
    window.addEventListener(type, finish, { passive: true });
  }
  frame = requestAnimationFrame(step);
  return finish;
}

/** Time spent looking at the projects before the pill points on to the CV. */
const CV_DWELL_MS = 10000;
const TICK_MS = 250;

/**
 * What the visitor has already been shown, kept for the browser session so that going to the
 * Resume page and back does not bring the hints back. Falls back to memory if storage is
 * unavailable (private windows, blocked site data).
 */
const memory = new Set<string>();
const seen = (key: string) => {
  try {
    return memory.has(key) || sessionStorage.getItem(`pill:${key}`) === "1";
  } catch {
    return memory.has(key);
  }
};
const markSeen = (key: string) => {
  memory.add(key);
  try {
    sessionStorage.setItem(`pill:${key}`, "1");
  } catch {
    /* memory copy is enough */
  }
};

/**
 * Scroll hint, with no visible UI: the page itself scrolls a little and back, twice.
 * - Top: after 5s of stillness on every page load, to show the projects below.
 * - Projects: once per visit, after 10s in the index, to show the CV below.
 * It gives way the moment the visitor touches anything.
 */
export function ScrollPill() {
  const lastInput = useRef(0);
  const cancelNudge = useRef<(() => void) | null>(null);

  useEffect(() => {
    let topNudged = false;
    let dwell = 0;
    let cvShown = false;
    lastInput.current = performance.now();

    const evaluate = () => {
      const nudging = !!cancelNudge.current;
      const zone = nudging ? "top" : readMode();
      if (!nudging && window.scrollY > 80) markSeen("top-done");

      let next: "top" | "cv" | "none" = "none";

      if (zone === "cv") {
        if (dwell >= CV_DWELL_MS && !seen("cv-done")) {
          next = "cv";
          cvShown = true;
        }
      } else if (cvShown) {
        // They have been shown the CV prompt and moved on: that is the one showing.
        markSeen("cv-done");
      }
      return { zone, next };
    };

    // Scrolling the visitor does counts as activity. The nudge's own scrolling does not.
    const onScroll = () => {
      if (!cancelNudge.current) lastInput.current = performance.now();
      evaluate();
    };
    const onInput = () => {
      lastInput.current = performance.now();
    };

    const tick = setInterval(() => {
      if (document.hidden) return;
      const { zone, next } = evaluate();
      if (zone === "cv") dwell += TICK_MS;

      if (cancelNudge.current || prefersReducedMotion()) return;
      if (performance.now() - lastInput.current < IDLE_MS) return;
      // At the top of the page the nudge runs on every page load (after the visitor has sat
      // still for 5s), whether or not the pill is showing. The CV nudge goes with its pill,
      // once per visit.
      if (zone === "top" && window.scrollY <= 80) {
        if (topNudged) return;
        topNudged = true;
      } else {
        if (next !== "cv" || seen("nudge-cv")) return;
        markSeen("nudge-cv");
      }
      cancelNudge.current = nudge(() => {
        cancelNudge.current = null;
        lastInput.current = performance.now();
        evaluate();
      });
    }, TICK_MS);

    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.addEventListener(type, onInput, { passive: true });
    }
    return () => {
      clearInterval(tick);
      cancelNudge.current?.();
      window.removeEventListener("scroll", onScroll);
      for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
        window.removeEventListener(type, onInput);
      }
    };
  }, []);

  // Hint only: the page itself moves, there is nothing to render.
  return null;
}
