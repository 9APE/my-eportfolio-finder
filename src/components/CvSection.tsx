import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

import { CvDocument, CvDownloadLink } from "@/components/CvDocument";
import { useInView } from "@/hooks/use-in-view";
import { useT } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

/**
 * The CV, one scroll below the last engineering project. It reads as the next entry in the
 * index: a ruled heading, then the document settling into place. `onActiveChange` lets the
 * sticky bar swap its project counter for the section name while the reader is in here.
 */
export function CvSection({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const t = useT();
  const { ref: sheetRef, inView } = useInView<HTMLDivElement>(0.08);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !onActiveChange) return;
    const obs = new IntersectionObserver(([entry]) => onActiveChange(!!entry?.isIntersecting), {
      rootMargin: "-40% 0px -40% 0px",
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      onActiveChange(false);
    };
  }, [onActiveChange]);

  return (
    <section id="cv" ref={sectionRef} className="mx-auto max-w-[1400px] scroll-mt-16 px-6 pb-20 sm:px-10">
      <div className="flex items-end justify-between border-b border-foreground/80 pb-4">
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <ChevronDown className="h-5 w-5 shrink-0 text-chart-3" aria-hidden="true" />
          {t.cvTitle}
        </h2>
        <span className={label}>{t.cvEyebrow}</span>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          to="/cv"
          className="group inline-flex items-center gap-2 border border-chart-3 bg-chart-3 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-background transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_-8px_var(--chart-3)]"
        >
          {t.cvOpenFull}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <CvDownloadLink />
      </div>

      <div
        ref={sheetRef}
        className={`cv-sheet mt-10 border border-border bg-background p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.35)] sm:p-12 ${
          inView ? "is-in" : ""
        }`}
      >
        <CvDocument />
      </div>
    </section>
  );
}
