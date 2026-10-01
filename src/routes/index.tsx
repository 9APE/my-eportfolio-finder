import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Expand,
  Mail,
  MapPin,
  Phone,
  Linkedin,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { TiltWrapper } from "@/components/TiltWrapper";
import { Reveal } from "@/components/Reveal";
import { ScrollPill } from "@/components/ScrollPill";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { RichText, stripMarks } from "@/components/RichText";
import { useLanguage, useT, localizeProjects } from "@/i18n/context";

import { prefersReducedMotion, useInView } from "@/hooks/use-in-view";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurélien Pons | Mechanical Engineering Portfolio" },
      {
        name: "description",
        content:
          "Mechanical engineering portfolio of Aurélien Pons: carbon-fibre monocoque design in Siemens NX, FEA in HyperMesh, composite manufacturing and a mecanum-drive Warman Challenge robot.",
      },
      { property: "og:title", content: "Aurélien Pons | Mechanical Engineering Portfolio" },
      {
        property: "og:description",
        content:
          "Formula Student monocoque design and validation, composite manufacturing DFM, and a mecanum-drive Warman Challenge robot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProjectIndex onExpand={(images, index) => setLightbox({ images, index })} />
      <Footer />
      <ScrollPill />
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onIndexChange={(i) => setLightbox({ ...lightbox, index: i })}
        />
      )}
    </main>
  );
}

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

function Hero() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  const localized = localizeProjects(projects, lang);
  const project = localized[active]!;

  // Auto-cycle the showcase every 7s; any slide change (manual or auto) restarts the timer.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % projects.length), 7000);
    return () => clearTimeout(t);
  }, [active]);

  const goPrev = (e: MouseEvent) => {
    e.stopPropagation();
    setActive((i) => (i - 1 + projects.length) % projects.length);
  };
  const goNext = (e: MouseEvent) => {
    e.stopPropagation();
    setActive((i) => (i + 1) % projects.length);
  };
  const openProject = () => {
    navigate({ to: "/projects/$slug", params: { slug: project.slug } });
  };

  return (
    <section className="relative border-b border-border">
      <LanguageSwitcher className="absolute right-4 top-4 z-50 sm:right-6 sm:top-6" />
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:py-16">
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">{t.heroTitle}</h1>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            <RichText text={t.heroIntro} />
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-2 border border-border sm:grid-cols-4">
            {[
              { value: 13, prefix: "", suffix: "+", t: t.statProjects },
              {
                value: 2,
                prefix: "",
                suffix: "nd",
                denominator: t.statRankingDenominator,
                t: t.statRanking,
              },
              {
                value: 75,
                prefix: "",
                suffix: "%",
                t: t.statStiffness,
                slug: "chassis-torsional-stiffness",
              },
              {
                value: 11,
                prefix: "",
                suffix: "%",
                t: t.statWing,
                slug: "aero-devices-fea",
              },
            ].map((s) => (
              <StatCell key={s.t} {...s} />
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            <RichText text={t.heroClosing} />
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <a
              href="mailto:ariimoanapons@gmail.com"
              className="flex items-start gap-3 text-foreground hover:underline"
            >
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
              ariimoanapons@gmail.com
            </a>
            <a href="tel:+4915233570697" className="flex items-start gap-3 text-foreground hover:underline">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
              +49 152 33570697
            </a>
            <span className="flex items-start gap-3 text-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
              {t.location}
            </span>
            <a
              href="https://linkedin.com/in/aurelienpons2004"
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 text-foreground hover:underline"
            >
              <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-chart-3" />
              linkedin.com/in/aurelienpons2004
            </a>
          </div>
        </div>

        {/* Project showcase — click the image to open that project; arrows browse without navigating */}
        <div
          role="button"
          tabIndex={0}
          onClick={openProject}
          onKeyDown={(e) => {
            if (e.key === "Enter") openProject();
          }}
          aria-label={t.viewProject(project.title)}
          className="group relative flex min-h-[420px] cursor-pointer items-center justify-center overflow-hidden bg-muted/60 p-8 text-left lg:min-h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        >
          {/* Auto-cycle progress bar — restarts on every slide change */}
          <span
            key={active}
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-chart-3 motion-reduce:hidden"
            style={{ animation: "hero-progress 7s linear forwards" }}
          />
          <span className={`${label} absolute bottom-6 right-6`}>
            {t.showcaseCounter(active + 1, localized.length)}
          </span>

          <TiltWrapper className="relative flex h-full w-full items-center justify-center" maxTilt={8}>
            {localized.map((p, i) => (
              <img
                key={p.slug}
                src={p.image}
                alt={p.title}
                width={1408}
                height={1104}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute max-h-[62%] max-w-[76%] bg-background object-contain shadow-[0_18px_50px_-24px_rgba(0,0,0,0.45)] transition-opacity duration-1000 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </TiltWrapper>

          <button
            type="button"
            onClick={goPrev}
            aria-label={t.previousProject}
            className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground/70 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={t.nextProject}
            className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground/70 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <span className="absolute bottom-24 left-1/2 w-[76%] -translate-x-1/2 text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            {project.title.toUpperCase()}
          </span>

          <span className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-2">
            {localized.map((p, i) => (
              <span
                key={p.slug}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`h-[3px] w-8 transition-colors ${
                  i === active ? "bg-foreground" : "bg-border"
                }`}
              />
            ))}
          </span>

        </div>
      </div>
    </section>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectIndex({ onExpand }: { onExpand: (images: string[], index: number) => void }) {
  const { lang, t } = useLanguage();
  const localized = localizeProjects(projects, lang);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Track which project is level with the middle of the viewport, and whether the hero is past.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = cardRefs.current.indexOf(e.target as HTMLDivElement);
          if (i >= 0) setActiveCard(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));

    const onScroll = () => {
      const top = sectionRef.current?.getBoundingClientRect().top ?? 1;
      setShowBar(top < 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToCard = (i: number) =>
    cardRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <>
      {/* Sticky bar — keeps the project count and contacts one click away once the hero is gone */}
      <div
        className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background/95 backdrop-blur transition-transform duration-300 ${
          showBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2.5 sm:px-10">
          <span className="text-sm font-bold tracking-tight">Aurélien Pons</span>
          <span className={`${label} tabular-nums`}>
            {t.projectCounter(pad(activeCard + 1), pad(localized.length))}
          </span>
          <span className="flex items-center gap-4">
            <a
              href="mailto:ariimoanapons@gmail.com"
              aria-label={t.emailAria}
              className="flex items-center gap-2 text-sm hover:text-chart-3"
            >
              <Mail className="h-4 w-4 text-chart-3" />
              <span className="hidden sm:inline">ariimoanapons@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/aurelienpons2004"
              target="_blank"
              rel="noreferrer"
              aria-label={t.linkedinAria}
              className="flex items-center gap-2 text-sm hover:text-chart-3"
            >
              <Linkedin className="h-4 w-4 text-chart-3" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </span>
        </div>
      </div>

      <section
        id="projects"
        ref={sectionRef}
        className="relative mx-auto max-w-[1400px] px-6 py-16 sm:px-10"
      >
        <div className="flex items-end justify-between border-b border-foreground/80 pb-4">
          <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
            <ChevronDown className="h-5 w-5 shrink-0 animate-bounce text-chart-3" aria-hidden="true" />
            {t.engineeringProjects}
          </h2>
          <span className={label}>{t.entries(localized.length)}</span>
        </div>

        {/* Progress rail — shows how far through the index you are */}
        <div className="pointer-events-none absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
          {localized.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollToCard(i)}
              aria-label={t.goTo(p.title)}
              className="pointer-events-auto group/rail flex items-center gap-2"
            >
              <span className="whitespace-nowrap border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground opacity-0 transition-opacity group-hover/rail:opacity-100">
                {p.title}
              </span>
              <span
                className={`h-[2px] transition-all duration-300 ${
                  i === activeCard ? "w-8 bg-chart-3" : "w-4 bg-border group-hover/rail:bg-foreground"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
          {localized.map((p, i) => (
            <div
              key={p.slug}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="h-full"
            >
              <Reveal className="h-full" delay={(i % 3) * 100}>
                <ProjectCard p={p} index={i} onExpand={onExpand} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* End-of-index marker */}
        <div className="mt-14 flex flex-col items-center gap-3 border-t border-foreground/80 pt-6 sm:flex-row sm:justify-between">
          <span className={label}>{t.endOfIndex(localized.length)}</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`${label} inline-flex items-center gap-2 border border-border px-3 py-2 transition-colors hover:border-chart-3 hover:text-foreground`}
          >
            {t.backToTop} <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </section>
    </>
  );
}

function StatCell({
  value,
  prefix,
  suffix,
  denominator,
  t,
  slug,
}: {
  value: number;
  prefix: string;
  suffix: string;
  denominator?: string;
  t: string;
  slug?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const [display, setDisplay] = useState(0);
  const copy = useT();

  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const duration = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  const content = (
    <>
      <div className="text-2xl font-bold tabular-nums">
        {prefix}
        {display}
        {suffix}
        {denominator && (
          <span className="ml-0.5 inline-block align-baseline text-xs font-medium text-muted-foreground">
            {denominator}
          </span>
        )}
      </div>
      <div className={`${label} mt-2 leading-snug`}>{t}</div>
    </>
  );

  return (
    <div ref={ref} className="border-r border-border last:border-r-0">
      {slug ? (
        <Link
          to="/projects/$slug"
          params={{ slug }}
          title={copy.statLinkTitle}
          className="group relative block h-full p-5 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60"
        >
          <ArrowUpRight
            aria-hidden="true"
            className="absolute right-3 top-3 h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-chart-3"
          />
          {content}
        </Link>
      ) : (
        <div className="p-5">{content}</div>
      )}
    </div>
  );
}

const HOVER_AUTO_OPEN_MS = 5000;

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

function ProjectCard({
  p,
  index,
  onExpand,
}: {
  p: Project;
  index: number;
  onExpand: (images: string[], index: number) => void;
}) {
  const navigate = useNavigate();
  const t = useT();
  const { ref: cardRef, inView } = useInView<HTMLElement>(0.25);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hovering, setHovering] = useState(false);

  const openProject = () => navigate({ to: "/projects/$slug", params: { slug: p.slug } });

  const startAutoOpen = () => {
    setHovering(true);
    hoverTimer.current = setTimeout(openProject, HOVER_AUTO_OPEN_MS);
  };
  const cancelAutoOpen = () => {
    setHovering(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  useEffect(() => cancelAutoOpen, []);

  return (
    <article
      ref={cardRef}
      className="relative flex h-full flex-col border border-border transition-all duration-300"
    >
      {/* Accent line draws across the top as the card enters view */}
      <span
        aria-hidden="true"
        className="accent-draw absolute inset-x-0 -top-px z-20 h-[2px] origin-left bg-chart-3"
        style={{
          transform: inView ? undefined : "scaleX(0)",
          animation: inView ? "accent-draw 700ms ease-out forwards" : "none",
        }}
      />
      <div
        className="group relative aspect-[4/3] overflow-hidden bg-muted/60"
        onMouseEnter={startAutoOpen}
        onMouseLeave={cancelAutoOpen}
      >
        {/* Hover-to-open progress bar — mirrors the hero slideshow timer */}
        {hovering && (
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-30 h-[3px] origin-left bg-chart-3 motion-reduce:hidden"
            style={{ animation: `hero-progress ${HOVER_AUTO_OPEN_MS}ms linear forwards` }}
          />
        )}
        <span className={`${label} absolute left-3 top-3 z-10 border border-border bg-background px-2 py-1 tabular-nums`}>
          {pad(index + 1)} / {pad(projects.length)}
        </span>

        <button
          type="button"
          aria-label={t.expandImageFor(p.title)}
          onClick={() => onExpand([p.image, ...p.gallery], 0)}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center border border-border bg-background/90 text-foreground/70 transition-colors hover:text-foreground"
        >
          <Expand className="h-4 w-4" />
        </button>

        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          aria-label={t.viewDetailsFor(p.title)}
          className="absolute inset-0 z-0"
        >
          <TiltWrapper className="h-full w-full" maxTilt={6}>
            <span className="relative block h-full w-full">
              <img
                src={p.image}
                alt={p.title}
                width={1408}
                height={1104}
                loading="lazy"
                className={`h-full w-full object-contain p-6 transition-all duration-500 group-hover:scale-[1.03] ${
                  p.hoverImage ? "group-hover:opacity-0" : ""
                }`}
              />
              {p.hoverImage && (
                <img
                  src={p.hoverImage}
                  alt={`${p.title} FEA`}
                  width={1408}
                  height={1104}
                  loading="lazy"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-contain p-6 opacity-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                />
              )}
            </span>
          </TiltWrapper>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-foreground/70 px-4 py-2.5 text-background opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <span className="font-mono text-xs uppercase tracking-[0.15em]">{t.moreDetails}</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-y border-border px-5 py-3">
        <span className={label}>{p.category}</span>
        <span className="flex flex-wrap justify-end gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="border border-chart-3/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-chart-3"
            >
              {t}
            </span>
          ))}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="mt-5">
          <Link
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="text-xl font-bold tracking-tight underline-offset-4 hover:underline"
          >
            {p.title}
          </Link>
        </h3>
        <span className={`${label} mt-1`}>{p.team}</span>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {truncate(stripMarks(p.what), 100)}
        </p>

        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          className={`${label} mt-4 inline-flex items-center gap-2 text-chart-3 transition-colors hover:text-foreground`}
        >
          {t.moreDetails} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span className={label}>{t.footerTagline}</span>
        <a href="mailto:ariimoanapons@gmail.com" className={`${label} hover:text-foreground`}>
          ariimoanapons@gmail.com
        </a>
      </div>
    </footer>
  );
}
