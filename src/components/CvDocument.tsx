import { useEffect, useRef, useState } from "react";
import { Download, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { Reveal } from "@/components/Reveal";
import { cv } from "@/data/cv";
import { prefersReducedMotion } from "@/hooks/use-in-view";
import { CV_COPY } from "@/i18n/cv-copy";
import { useLanguage, useT } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";
const sectionHeading = "font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground";

/**
 * How far the reader has scrolled through an element, 0 to 1, with the trigger line sitting
 * 60% of the way down the viewport. Drives the timeline fill. Jumps straight to 1 for
 * visitors who ask for reduced motion.
 */
function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, (line - rect.top) / rect.height)));
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
  }, []);

  return { ref, progress };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-4 border-b border-border pb-2">
        <h3 className={sectionHeading}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function RoleDates({ role }: { role: { start: string; end: string | null } }) {
  const t = useT();
  return (
    <span className={`${label} whitespace-nowrap tabular-nums`}>
      {role.start} – {role.end ?? t.cvPresent}
    </span>
  );
}

function Timeline() {
  const t = useT();
  const { lang } = useLanguage();
  const copy = CV_COPY[lang];
  const { ref, progress } = useScrollProgress<HTMLOListElement>();

  return (
    <Section title={t.cvExperience}>
      <ol ref={ref} className="relative ml-2 space-y-9 border-l border-border pl-8">
        {/* The teal line fills as the reader scrolls down the career. */}
        <span
          aria-hidden="true"
          className="absolute -left-px top-0 w-[2px] origin-top bg-chart-3"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />
        {copy.experience.map((role, i) => {
          // A dot lights up once the line has reached it.
          const reached = progress >= (i + 0.3) / copy.experience.length;
          return (
            <li key={i} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[37px] top-1.5 h-3 w-3 border-2 transition-all duration-500 motion-reduce:transition-none ${
                  reached
                    ? "scale-110 border-chart-3 bg-chart-3 shadow-[0_0_0_4px_color-mix(in_oklab,var(--chart-3)_18%,transparent)]"
                    : "border-border bg-background"
                }`}
              />
              <Reveal>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h4 className="text-lg font-bold tracking-tight">{role.title}</h4>
                  <RoleDates role={cv.experience[i]!} />
                </div>
                <p className={`${label} mt-1`}>
                  {role.org}
                  {role.note ? <span className="text-chart-3"> · {role.note}</span> : null}
                </p>
                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-foreground/85">
                  {role.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-chart-3" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/** The CV itself. Used inline on the home page and on the standalone /cv page. */
export function CvDocument() {
  const t = useT();
  const { lang } = useLanguage();
  const copy = CV_COPY[lang];

  return (
    <article className="space-y-12" aria-label={t.cvTitle}>
      <header>
        <h2 className="text-4xl font-bold tracking-tight sm:text-6xl">{cv.name}</h2>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{copy.headline}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-chart-3" aria-hidden="true" />
            {t.location}
          </span>
          <a href={`tel:${cv.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-chart-3">
            <Phone className="h-4 w-4 text-chart-3" aria-hidden="true" />
            {cv.phone}
          </a>
          <a href={`mailto:${cv.email}`} className="flex items-center gap-2 hover:text-chart-3">
            <Mail className="h-4 w-4 text-chart-3" aria-hidden="true" />
            {cv.email}
          </a>
          <a
            href={cv.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-chart-3"
          >
            <Linkedin className="h-4 w-4 text-chart-3" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
        <div className="cv-rule mt-6 h-px bg-foreground/80" />
      </header>

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="space-y-12">
          <Reveal>
            <Section title={t.cvSummary}>
              <p className="leading-relaxed text-foreground/85">{copy.summary}</p>
            </Section>
          </Reveal>

          <Reveal>
            <Section title={t.cvSkills}>
              <dl className="space-y-4">
                {copy.skills.map((s) => (
                  <div key={s.area}>
                    <dt className="text-sm font-bold">{s.area}</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{s.detail}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </Reveal>
        </div>

        <Timeline />
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <Section title={t.cvEducation}>
            <ul className="space-y-6">
              {copy.education.map((e, i) => (
                <li key={i}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <h4 className="font-bold tracking-tight">{e.degree}</h4>
                    <span className={`${label} whitespace-nowrap tabular-nums`}>
                      {cv.education[i]!.start} – {cv.education[i]!.end}
                      {cv.education[i]!.expected ? ` (${t.cvExpected})` : ""}
                    </span>
                  </div>
                  <p className={`${label} mt-1`}>{e.school}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/85">{e.note}</p>
                </li>
              ))}
            </ul>
          </Section>
        </Reveal>

        <Reveal delay={100}>
          <Section title={t.cvLanguages}>
            <p className="text-sm leading-relaxed text-foreground/85">{copy.languages}</p>
            <p className={`${label} mt-5`}>{t.cvCitizenship}</p>
            <p className="mt-1 text-sm text-foreground/85">{copy.citizenship}</p>
          </Section>
        </Reveal>
      </div>
    </article>
  );
}

export function CvDownloadLink({ className = "" }: { className?: string }) {
  const t = useT();
  return (
    <a
      href={cv.pdf}
      download
      title={t.cvPdfHint}
      className={`${label} inline-flex items-center gap-2 border border-border bg-background px-3 py-2 transition-colors hover:border-chart-3 hover:text-foreground ${className}`}
    >
      <Download className="h-3.5 w-3.5 text-chart-3" aria-hidden="true" />
      {t.cvDownload}
    </a>
  );
}
