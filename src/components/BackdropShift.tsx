import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/hooks/use-in-view";

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/**
 * The page's scrolling colour: three palettes of soft glows in the same three spots of a layer
 * pinned to the screen (see .backdrop-shift in styles.css). The spots never move. As the visitor
 * scrolls, the page fades from the first palette (the introduction) through the second (the
 * projects) to the third (the CV), so the colours travel through the spots.
 *
 * On pages without those sections, the three palettes are spread over the length of the page.
 * Only opacity is written (straight to the elements, without re-rendering React), and visitors
 * who prefer reduced motion simply keep the first palette.
 */
export function BackdropShift() {
  const layers = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let frame = 0;

    const docTop = (id: string) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : null;
    };

    const update = () => {
      frame = 0;
      // The first palette is exactly the top of the page; the second is fully in once the projects
      // reach the upper part of the screen, and the third once the CV does.
      const lead = window.innerHeight * 0.15;
      const projectsY = docTop("projects");
      const cvY = docTop("cv");
      let t: number; // 0 = first palette, 1 = second, 2 = third
      if (projectsY !== null && cvY !== null && cvY > projectsY) {
        const a1 = Math.max(projectsY - lead, 1);
        const a2 = Math.max(cvY - lead, a1 + 1);
        t = window.scrollY < a1 ? window.scrollY / a1 : 1 + (window.scrollY - a1) / (a2 - a1);
      } else {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        t = (window.scrollY / max) * 2;
      }
      t = Math.min(2, Math.max(0, t));
      const weights = [clamp01(1 - t), clamp01(1 - Math.abs(t - 1)), clamp01(t - 1)];
      weights.forEach((w, i) => {
        const el = layers[i]!.current;
        if (el) el.style.opacity = String(smooth(w).toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="backdrop-shift" aria-hidden="true">
      <div ref={layers[0]} className="backdrop-layer l1" />
      <div ref={layers[1]} className="backdrop-layer l2" />
      <div ref={layers[2]} className="backdrop-layer l3" />
    </div>
  );
}
