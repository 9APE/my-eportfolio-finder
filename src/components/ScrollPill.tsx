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

/**
 * Floating scroll hint pill.
 * - Hidden for the first 4s after load, then slides up into view and points at the projects.
 * - After 5s without any scrolling, the page itself gives a small nudge down and back.
 * - Fades out once the visitor scrolls past ~80px.
 * - Inside the project index it returns as "Next: Curriculum Vitae", nudges once more if the
 *   visitor lingers, and jumps to the CV on click. It goes away once the CV is on screen.
 * - Hover or focus expands it into a plain-language prompt.
 */
export function ScrollPill() {
  const copy = useT();
  const [appeared, setAppeared] = useState(false);
  const [mode, setMode] = useState<Mode>("top");
  const [hovered, setHovered] = useState(false);

  const lastInput = useRef(0);
  const nudged = useRef<Record<string, boolean>>({});
  const cancelNudge = useRef<(() => void) | null>(null);
  const modeRef = useRef<Mode>("top");

  useEffect(() => {
    const appear = setTimeout(() => setAppeared(true), 4000);
    lastInput.current = performance.now();

    const sync = () => {
      const next = readMode();
      modeRef.current = next;
      setMode(next);
    };
    // Scrolling the visitor does counts as activity. The nudge's own scrolling does not.
    const onScroll = () => {
      if (!cancelNudge.current) lastInput.current = performance.now();
      sync();
    };
    const onInput = () => {
      lastInput.current = performance.now();
    };
    sync();

    const idleCheck = setInterval(() => {
      if (cancelNudge.current || prefersReducedMotion() || document.hidden) return;
      const context = modeRef.current;
      if (context === "none" || nudged.current[context]) return;
      if (performance.now() - lastInput.current < IDLE_MS) return;
      nudged.current[context] = true;
      cancelNudge.current = nudge(() => {
        cancelNudge.current = null;
        lastInput.current = performance.now();
        sync();
      });
    }, 500);

    window.addEventListener("scroll", onScroll, { passive: true });
    for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
      window.addEventListener(type, onInput, { passive: true });
    }
    return () => {
      clearTimeout(appear);
      clearInterval(idleCheck);
      cancelNudge.current?.();
      window.removeEventListener("scroll", onScroll);
      for (const type of ["wheel", "touchstart", "keydown", "pointerdown"]) {
        window.removeEventListener(type, onInput);
      }
    };
  }, []);

  // While fading out ("none"), keep the wording it had so the text doesn't flip mid-fade.
  const labelMode = useRef<Exclude<Mode, "none">>("top");
  if (mode !== "none") labelMode.current = mode;
  const toCv = labelMode.current === "cv";
  const visible = mode !== "none" && (mode === "cv" || appeared);

  const go = () => {
    const target = toCv ? "cv" : "projects";
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
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
