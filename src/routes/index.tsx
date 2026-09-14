import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  Mail,
  MapPin,
  Phone,
  Linkedin,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { TiltWrapper } from "@/components/TiltWrapper";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurélien Pons — Mechanical Engineering Portfolio" },
      {
        name: "description",
        content:
          "Mechanical engineering portfolio of Aurélien Pons: carbon-fibre monocoque design in Siemens NX, FEA in HyperMesh, composite manufacturing and a mecanum-drive Warman Challenge robot.",
      },
      { property: "og:title", content: "Aurélien Pons — Mechanical Engineering Portfolio" },
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

  const project = projects[active]!;

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
  const scrollToProjects = (e: MouseEvent) => {
    e.stopPropagation();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative border-b border-border">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[1fr_0.95fr]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:py-24">
          <span className={label}>Ref. AP-00 / Assembly View</span>
          <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">Aurélien Pons' ePortfolio</h1>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Final-year Mechanical Engineering student working across the full design-analysis-validation
            cycle for Formula Student. I design and package chassis geometry in Siemens NX, validate
            structures through FEA in Altair HyperMesh, and take parts from first-principles requirements
            through to manufactured carbon-fibre hardware. Currently building GD&amp;T and CATIA
            proficiency.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-3 border border-border">
            {[
              { n: "+75%", t: "Torsional rigidity increase" },
              { n: "−11%", t: "Rear-wing weight" },
              { n: "100%", t: "Engineering documentation grade" },
            ].map((s) => (
              <div key={s.t} className="border-r border-border p-5 last:border-r-0">
                <div className="text-2xl font-bold">{s.n}</div>
                <div className={`${label} mt-2 leading-snug`}>{s.t}</div>
              </div>
            ))}
          </div>

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
              Aachen, Germany
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
          aria-label={`View project ${project.title}`}
          className="group relative flex min-h-[420px] cursor-pointer items-center justify-center overflow-hidden bg-muted/60 p-8 text-left lg:min-h-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--border) 60%, transparent) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        >
          <span className={`${label} absolute right-6 top-6`}>Drawn by: A. Pons</span>

          <TiltWrapper className="relative flex h-full w-full items-center justify-center" maxTilt={8}>
            {projects.map((p, i) => (
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
            aria-label="Previous project"
            className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground/70 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next project"
            className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-border bg-background/90 text-foreground/70 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <span className="absolute bottom-24 left-1/2 w-[76%] -translate-x-1/2 text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            {project.ref} — {project.title.toUpperCase()}
          </span>

          <span className="absolute bottom-14 left-1/2 flex -translate-x-1/2 gap-2">
            {projects.map((p, i) => (
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

          <button
            type="button"
            onClick={scrollToProjects}
            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Scroll for more details <ArrowDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectIndex({ onExpand }: { onExpand: (images: string[], index: number) => void }) {
  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
      <span className={label}>Ref. AP-BOM / Project Index</span>
      <div className="mt-3 flex items-end justify-between border-b border-foreground/80 pb-4">
        <h2 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          <ChevronDown className="h-5 w-5 shrink-0 animate-bounce text-chart-3" aria-hidden="true" />
          Engineering Projects
          <ChevronDown className="h-5 w-5 shrink-0 animate-bounce text-chart-3" aria-hidden="true" />
        </h2>
        <span className={label}>{projects.length} Entries</span>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} onExpand={onExpand} />
        ))}
      </div>
    </section>
  );
}

const HOVER_AUTO_OPEN_MS = 5000;

function ProjectCard({
  p,
  onExpand,
}: {
  p: Project;
  onExpand: (images: string[], index: number) => void;
}) {
  const navigate = useNavigate();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openProject = () => navigate({ to: "/projects/$slug", params: { slug: p.slug } });

  const startAutoOpen = () => {
    hoverTimer.current = setTimeout(openProject, HOVER_AUTO_OPEN_MS);
  };
  const cancelAutoOpen = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  useEffect(() => cancelAutoOpen, []);

  return (
    <article className="flex flex-col border border-border">
      <div
        className="group relative aspect-[4/3] overflow-hidden bg-muted/60"
        onMouseEnter={startAutoOpen}
        onMouseLeave={cancelAutoOpen}
      >
        <span className={`${label} absolute left-3 top-3 z-10 border border-border bg-background px-2 py-1`}>
          {p.ref}
        </span>

        <button
          type="button"
          aria-label={`Expand image for ${p.title}`}
          onClick={() => onExpand([p.image, ...p.gallery], 0)}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center border border-border bg-background/90 text-foreground/70 transition-colors hover:text-foreground"
        >
          <Expand className="h-4 w-4" />
        </button>

        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          aria-label={`View ${p.title} details`}
          className="absolute inset-0 z-0"
        >
          <TiltWrapper className="h-full w-full" maxTilt={6}>
            <img
              src={p.image}
              alt={p.title}
              width={1408}
              height={1104}
              loading="lazy"
              className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </TiltWrapper>
        </Link>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-foreground/70 px-4 py-2.5 text-background opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <span className="font-mono text-xs uppercase tracking-[0.15em]">More details</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-center justify-between border-y border-border px-5 py-3">
        <span className={label}>{p.category}</span>
        <span className="flex gap-2">
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

        <div className="mt-6 grid flex-1 grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <div className={label}>What</div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.what}</p>
          </div>
          <div>
            <div className={label}>How</div>
            <ul className="mt-2 space-y-2">
              {p.how.map((h) => (
                <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                  <span className="text-chart-3">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className={`${label} text-chart-3`}>Result</div>
            <ul className="mt-2 space-y-2">
              {p.result.map((r) => (
                <li key={r} className="flex gap-2 text-sm font-medium leading-relaxed">
                  <span className="text-chart-3">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          to="/projects/$slug"
          params={{ slug: p.slug }}
          className={`${label} mt-8 inline-flex items-center gap-2 transition-colors hover:text-foreground`}
        >
          more details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <span className={label}>Aurélien Pons — Mechanical Engineering</span>
        <a href="mailto:ariimoanapons@gmail.com" className={`${label} hover:text-foreground`}>
          ariimoanapons@gmail.com
        </a>
      </div>
    </footer>
  );
}
