import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";
import { prefersReducedMotion } from "@/hooks/use-in-view";
import { useT } from "@/i18n/context";

const pad = (n: number) => String(n).padStart(2, "0");

/** How long the page must sit still before it offers a nudge. */
const IDLE_MS = 5000;
/** Distance of the nudge. Kept under the 80px at which the top pill fades away. */
const NUDGE_PX = 56;

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
  const down = 650;
  const hold = 220;
  const up = 800;
  const total = down + hold + up;
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
    if (elapsed < down) y = startY + NUDGE_PX * easeOutCubic(elapsed / down);
    else if (elapsed < down + hold) y = startY + NUDGE_PX;
    else if (elapsed < total) y = startY + NUDGE_PX * (1 - easeInOutCubic((elapsed - down - hold) / up));
    else y = startY;
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
 * Floating scroll hint pill. Each hint is shown at most once per visit.
 * - Top: hidden for the first 4s, then slides up and points at the projects. If the visitor
 *   hasn't scrolled after 5s the page gives a small nudge down and back. Once they scroll
 *   away from the top it never returns, even if they scroll back up.
 * - Projects: after 10s spent in the project index it appears as "Next: Curriculum Vitae"
 *   (with one more nudge if they are still), and a click jumps to the CV. Once they leave
 *   the projects, or click, it is gone for good.
 * - Hover or focus expands either one into a plain-language prompt.
 */
export function ScrollPill() {
  const copy = useT();
  const [pill, setPill] = useState<"top" | "cv" | "none">("none");
  const [hovered, setHovered] = useState(false);

  const lastInput = useRef(0);
  const cancelNudge = useRef<(() => void) | null>(null);

  useEffect(() => {
    let appeared = false;
    let dwell = 0;
    let cvShown = false;
    lastInput.current = performance.now();

    const evaluate = () => {
      const zone = readMode();
      if (window.scrollY > 80) markSeen("top-done");

      let next: "top" | "cv" | "none" = "none";
      if (zone === "top" && appeared && !seen("top-done")) next = "top";
      if (zone === "cv") {
        if (dwell >= CV_DWELL_MS && !seen("cv-done")) {
          next = "cv";
          cvShown = true;
        }
      } else if (cvShown) {
        // They have been shown the CV prompt and moved on: that is the one showing.
        markSeen("cv-done");
      }
      setPill(next);
      return { zone, next };
    };

    const appear = setTimeout(() => {
      appeared = true;
      evaluate();
    }, 4000);

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
      // A nudge only goes with a hint that is on screen, and only ever once per hint.
      const context = next === "top" ? "top" : next === "cv" ? "cv" : null;
      if (!context || seen(`nudge-${context}`)) return;
      markSeen(`nudge-${context}`);
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
      clearTimeout(appear);
      clearInterval(tick);
      cancelNudge.current?.();
      window.removeEventListener("scroll", onScroll);
      for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
        window.removeEventListener(type, onInput);
      }
    };
  }, []);

  // While fading out ("none"), keep the wording it had so the text doesn't flip mid-fade.
  const labelMode = useRef<"top" | "cv">("top");
  if (pill !== "none") labelMode.current = pill;
  const toCv = labelMode.current === "cv";
  const visible = pill !== "none";

  const go = () => {
    if (toCv) {
      markSeen("cv-done");
      setPill("none");
    }
    document.getElementById(toCv ? "cv" : "projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={go}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={toCv ? copy.scrollToCv : copy.scrollToProjects}
        tabIndex={visible ? 0 : -1}
        className="flex items-center gap-2.5 rounded-full border border-background/20 bg-foreground/85 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-background shadow-lg backdrop-blur-md transition-all duration-300 tabular-nums hover:-translate-y-0.5 hover:scale-105 hover:bg-foreground hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="whitespace-nowrap">
          {toCv
            ? hovered
              ? copy.cvPillHover
              : copy.cvPill
            : hovered
              ? copy.explorePortfolio
              : copy.showcaseCounter(1, projects.length)}
        </span>
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 animate-[cue-pulse_1.6s_ease-in-out_infinite] motion-reduce:animate-none"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
