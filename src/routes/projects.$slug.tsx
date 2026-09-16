import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Expand, FileText, Linkedin, Mail, Phone } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";
import { Reveal } from "@/components/Reveal";
import { RichText, stripMarks } from "@/components/RichText";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { title: project.title, what: stripMarks(project.what) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable | Aurélien Pons" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} | Aurélien Pons`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.what.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.what.slice(0, 155) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
});

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";
const sectionHeading = "font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground";
function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug)!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const fullGallery = [project.image, ...project.gallery.filter((img) => img !== project.image)];
  const otherProjects = projects.filter((p) => p.slug !== slug);

  // The bottom bar previews How / Result / Spec while they are still below the fold,
  // then gets out of the way once the reader actually reaches them.
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [showPeekBar, setShowPeekBar] = useState(true);

  useEffect(() => {
    const el = sectionsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        // rootMargin pulls the trigger line up to 60% of the viewport, so a stray
        // sliver at the bottom edge doesn't count as "the reader got there".
        const triggerLine = entry.rootBounds?.bottom ?? window.innerHeight;
        const isBelowFold = entry.boundingClientRect.top > triggerLine;
        setShowPeekBar(!entry.isIntersecting && isBelowFold);
      },
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [slug]);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <Link
              to="/"
              aria-label="Back to index"
              title="Back to index"
              className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center border border-border text-foreground/70 transition-colors hover:border-chart-3 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="min-w-0">
              <span className={label}>{project.category}</span>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
              <span className={`${label} mt-1 block`}>{project.team}</span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-1.5 text-sm sm:items-end">
            <a
              href="mailto:ariimoanapons@gmail.com"
              className="flex items-center gap-2 text-foreground hover:underline"
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-chart-3" />
              ariimoanapons@gmail.com
            </a>
            <a href="tel:+4915233570697" className="flex items-center gap-2 text-foreground hover:underline">
              <Phone className="h-3.5 w-3.5 shrink-0 text-chart-3" />
              +49 152 33570697
            </a>
            <a
              href="https://linkedin.com/in/aurelienpons2004"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-foreground hover:underline"
            >
              <Linkedin className="h-3.5 w-3.5 shrink-0 text-chart-3" />
              linkedin.com/in/aurelienpons2004
            </a>
          </div>
        </div>

        {project.slug === "warman-challenge-robot" && (
          <a
            href="/warman-engineering-process.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/60"
          >
            <FileText className="h-4 w-4 text-chart-3" />
            View full engineering process (PDF)
          </a>
        )}

        {/* What — inline, long-form, spans the full width of the images below */}
        <Reveal className="mt-6">
          <div id="section-what">
            <div className={sectionHeading}>
              <span className="text-chart-3">01</span> What
            </div>
            <p className="mt-2 text-lg leading-relaxed">
              <RichText text={project.what} />
            </p>
          </div>
        </Reveal>

        {/* Images — thumbnail rail (hover to preview, height-matched to the main image) + main image */}
        <Reveal className="mt-6" delay={100}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[88px_1fr]">
          <div className="flex gap-3 overflow-x-auto lg:h-full lg:flex-col lg:overflow-hidden">
            {fullGallery.map((img, i) => (
              <button
                key={img}
                type="button"
                onMouseEnter={() => setActiveImage(i)}
                onFocus={() => setActiveImage(i)}
                onClick={() => setLightbox(i)}
                aria-label={`Preview image ${i + 1}`}
                className={`relative aspect-square w-16 shrink-0 overflow-hidden border bg-muted/60 transition-colors lg:aspect-auto lg:w-full lg:min-h-0 lg:flex-1 ${
                  i === activeImage ? "border-chart-3" : "border-border hover:border-chart-3/60"
                }`}
              >
                <img
                  src={img}
                  alt={`${project.title} thumbnail ${i + 1}`}
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setLightbox(activeImage)}
            aria-label="Expand main image"
            className="group relative block aspect-[16/7] w-full overflow-hidden border border-border bg-muted/60"
          >
            <img
              src={fullGallery[activeImage]}
              alt={project.title}
              width={1408}
              height={1104}
              loading="eager"
              className="h-full w-full object-contain p-4"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-opacity group-hover:bg-foreground/10 group-hover:opacity-100">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90">
                <Expand className="h-4 w-4" />
              </span>
            </span>
          </button>
        </div>
        </Reveal>

        {/* How / Result + a separate Technical Specification box, tight under the images */}
        <Reveal delay={150}>
        <div ref={sectionsRef} className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-1 border border-border sm:grid-cols-2">
            <div className="border-b border-border p-4 sm:border-b-0 sm:border-r" id="section-how">
              <div className={sectionHeading}>
                <span className="text-chart-3">02</span> How
              </div>
              <ol className="mt-2 space-y-2">
                {project.how.map((h, i) => (
                  <li key={h} className="flex gap-2 text-sm leading-snug text-muted-foreground">
                    <span className="font-mono text-xs text-chart-3">{String(i + 1).padStart(2, "0")}</span>
                    <span><RichText text={h} /></span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-4" id="section-result">
              <div className={sectionHeading}>
                <span className="text-chart-3">03</span> Result
              </div>
              <ul className="mt-2 space-y-2">
                {project.result.map((r) => (
                  <li key={r} className="flex gap-2 text-sm font-medium leading-snug">
                    <span className="text-chart-3">-</span>
                    <span><RichText text={r} /></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="h-fit border border-border lg:sticky lg:top-6" id="section-spec">
            <div className="border-b border-border px-4 py-3">
              <span className={sectionHeading}>Technical Specification</span>
            </div>
            {project.spec.map((s) => (
              <div key={s.label} className="flex items-start justify-between gap-3 border-b border-border px-4 py-3">
                <span className={label}>{s.label}</span>
                <span className="text-right font-mono text-xs">{s.value}</span>
              </div>
            ))}
            <div className="px-4 py-3">
              <span className={label}>Skills</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span
                    key={s}
                    className="border border-chart-3/40 px-2 py-1 font-mono text-[10px] text-chart-3"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
        </Reveal>
      </div>

      {/* Other Projects — horizontal scroll strip */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">More Engineering Projects</h2>
            </div>
            <span className={`${label} hidden sm:inline-flex items-center gap-2`}>
              Scroll <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>

          <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
            {otherProjects.map((p) => (
              <Link
                key={p.slug}
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block w-60 shrink-0 border border-border bg-background"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/60">
                  <img
                    src={p.image}
                    alt={p.title}
                    width={640}
                    height={480}
                    loading="lazy"
                    className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="border-t border-border p-3">
                  <span className={label}>{p.category}</span>
                  <div className="mt-1 text-sm font-bold leading-snug tracking-tight group-hover:underline">
                    {p.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Peek bar — previews the sections below the fold, then slides away once they're reached */}
      <nav
        aria-hidden={!showPeekBar}
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-out ${
          showPeekBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-3">
          {[
            { id: "section-how", n: "02", title: "How" },
            { id: "section-result", n: "03", title: "Result" },
            { id: "section-spec", n: null, title: "Technical Specification" },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              tabIndex={showPeekBar ? 0 : -1}
              onClick={() => jumpTo(s.id)}
              className="group flex items-center justify-center gap-2 border-r border-border py-3 font-mono text-xs font-bold uppercase tracking-[0.18em] text-foreground transition-colors last:border-r-0 hover:bg-muted/60"
            >
              {s.n && <span className="text-chart-3">{s.n}</span>}
              <span>{s.title}</span>
              <ArrowDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-y-0.5 group-hover:text-chart-3" />
            </button>
          ))}
        </div>
      </nav>

      {lightbox !== null && (
        <Lightbox
          images={fullGallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </main>
  );
}
