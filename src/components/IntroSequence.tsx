import { useEffect, useRef } from "react";

import { useT } from "@/i18n/context";

/** Timeline, in ms from the start of the intro. */
const CURTAIN_UP = 1200; // phase 1 ends: the curtain lifts and the camera starts to pan
const PAN_MS = 1600; // phase 2: glide down to the engineering projects
const CARDS_AT = 1900; // project cards light up once they are coming into view
const CARD_STEP = 110;
const SKILLS_AT = 2800; // phase 3: the skill pills run a diagnostic pass
const SKILL_STEP = 110;
const END_AT = 4000;
const SEEN_KEY = "intro-seen";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A short, once-per-session opening sequence, told top to bottom:
 *   1. a dark telemetry curtain introduces the name and the headline numbers,
 *   2. the curtain lifts and the page glides down to the engineering projects, whose cards
 *      light up in turn,
 *   3. the skill pills light up one after another, ending on the default pill.
 *
 * Whether it runs is decided before first paint by a script in the document head (the
 * `intro-pending` class), so the page never flashes behind the curtain. Any wheel, touch or key
 * press, or the Skip button, ends it at once and leaves the page where it is.
 */
export function IntroSequence() {
  const t = useT();
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("intro-pending")) return;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* the intro simply may run again on the next visit */
    }

    const timers: number[] = [];
    const highlighted: Element[] = [];
    let frame = 0;
    let done = false;
    let lastSet = window.scrollY;

    const flash = (el: Element | undefined, cls: string, ms = 1300) => {
      if (!el) return;
      el.classList.add(cls);
      highlighted.push(el);
      timers.push(window.setTimeout(() => el.classList.remove(cls), ms));
    };

    const finish = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      for (const type of ["wheel", "touchstart", "keydown"]) window.removeEventListener(type, finish);
      curtainRef.current?.classList.add("is-leaving");
      // Let the curtain fade out before the intro layer is removed altogether.
      window.setTimeout(() => root.classList.remove("intro-pending"), 700);
      window.setTimeout(() => {
        highlighted.forEach((el) => el.classList.remove("intro-hl", "intro-ping", "intro-settle"));
      }, 1400);
    };
    (window as unknown as { __skipIntro?: () => void }).__skipIntro = finish;

    for (const type of ["wheel", "touchstart", "keydown"]) {
      window.addEventListener(type, finish, { passive: true });
    }

    // Phase 2: lift the curtain and pan down to the projects.
    timers.push(
      window.setTimeout(() => {
        curtainRef.current?.classList.add("is-leaving");
        const target = document.getElementById("projects");
        if (!target) return;
        const startY = window.scrollY;
        const endY = Math.max(0, target.getBoundingClientRect().top + window.scrollY);
        const begin = performance.now();
        const step = (now: number) => {
          if (done) return;
          // The visitor (or the browser) moved the page: stop steering it.
          if (Math.abs(window.scrollY - lastSet) > 3) return finish();
          const p = Math.min(1, (now - begin) / PAN_MS);
          lastSet = Math.round(startY + (endY - startY) * easeInOutCubic(p));
          window.scrollTo({ top: lastSet, behavior: "instant" });
          if (p < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      }, CURTAIN_UP),
    );

    // Phase 2, continued: the project cards light up one by one.
    const cards = Array.from(document.querySelectorAll("#projects article"));
    cards.forEach((card, i) =>
      timers.push(window.setTimeout(() => flash(card, "intro-hl"), CARDS_AT + i * CARD_STEP)),
    );

    // Phase 3: the skill pills run a diagnostic pass, then settle on the default one.
    const pills = Array.from(document.querySelectorAll("[data-skill-id]"));
    pills.forEach((pill, i) =>
      timers.push(window.setTimeout(() => flash(pill, "intro-ping", 900), SKILLS_AT + i * SKILL_STEP)),
    );
    timers.push(
      window.setTimeout(() => flash(pills[0], "intro-settle", 1400), SKILLS_AT + pills.length * SKILL_STEP + 60),
    );

    timers.push(window.setTimeout(finish, END_AT));

    return () => {
      done = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      for (const type of ["wheel", "touchstart", "keydown"]) window.removeEventListener(type, finish);
      root.classList.remove("intro-pending");
    };
  }, []);

  const stats = [
    { value: "13+", label: t.statProjects },
    { value: "2nd", label: t.statRanking },
    { value: "75%", label: t.statStiffness },
    { value: "11%", label: t.statWing },
  ];

  return (
    <>
      <div ref={curtainRef} className="intro-curtain" aria-hidden="true">
        <div className="intro-dots" />
        <div className="intro-glow" />
        <div className="intro-content">
          <span className="intro-eyebrow">
            <span className="intro-eyebrow-dot" />
            {t.introEyebrow}
          </span>
          <div className="intro-title">{t.heroTitle}</div>
          <ul className="intro-badges">
            {stats.map((s, i) => (
              <li key={s.label} className="intro-badge" style={{ animationDelay: `${420 + i * 110}ms` }}>
                <span className="intro-badge-value">{s.value}</span>
                <span className="intro-badge-label">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button type="button" className="intro-skip" onClick={() => (window as unknown as { __skipIntro?: () => void }).__skipIntro?.()}>
        {t.skipIntro}
      </button>
    </>
  );
}
