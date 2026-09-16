import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { projects } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Floating scroll indicator pill.
 * - Hidden for the first 4s after load, then slides up into view.
 * - Fades out once the visitor scrolls past ~80px, returns at the top.
 * - Hover expands it into an "Explore Portfolio" prompt; click scrolls to the grid.
 */
export function ScrollPill() {
  const [appeared, setAppeared] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAppeared(true), 4000);
    const onScroll = () => setScrolledPast(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = appeared && !scrolledPast;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label="Scroll down to the engineering projects"
        className="flex items-center gap-2.5 rounded-full border border-background/20 bg-foreground/85 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-background shadow-lg backdrop-blur-md transition-all duration-300 tabular-nums hover:-translate-y-0.5 hover:scale-105 hover:bg-foreground hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      >
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="whitespace-nowrap">
          {hovered ? (
            <>Explore Portfolio</>
          ) : (
            <>
              {pad(1)} / {pad(projects.length)} Projects
            </>
          )}
        </span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </button>
    </div>
  );
}
