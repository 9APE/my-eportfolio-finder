import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Expand, FileText } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { Lightbox } from "@/components/Lightbox";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { title: project.title, what: project.what };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project unavailable — Aurélien Pons" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} — Aurélien Pons`;
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
const MAX_VISIBLE_THUMBS = 3;

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug)!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);

  const fullGallery = [project.image, ...project.gallery.filter((img) => img !== project.image)];
  const otherProjects = projects.filter((p) => p.slug !== slug);
  const visibleThumbs = fullGallery.slice(0, MAX_VISIBLE_THUMBS);
  const hiddenThumbCount = fullGallery.length - MAX_VISIBLE_THUMBS;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 sm:px-10">
          <Link to="/" className={`${label} inline-flex items-center gap-2 hover:text-foreground`}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to index
          </Link>
          <span className={label}>{project.category}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-8 sm:px-10">
        <span className={label}>Ref. {project.ref}</span>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <span className={`${label} mt-1 block`}>{project.team}</span>

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
        <div className="mt-6" id="section-what">
          <div className={sectionHeading}>
            <span className="text-chart-3">01</span> What
          </div>
          <p className="mt-2 text-lg leading-relaxed">{project.what}</p>
        </div>

        {/* Images — thumbnail rail (hover to preview, height-matched to the main image) + main image */}
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[88px_1fr]">
          <div className="flex gap-3 overflow-x-auto lg:h-full lg:flex-col lg:overflow-hidden">
            {visibleThumbs.map((img, i) => (
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
            {hiddenThumbCount > 0 && (
              <button
                type="button"
                onClick={() => setLightbox(MAX_VISIBLE_THUMBS)}
                aria-label={`See ${hiddenThumbCount} more images`}
                className="relative aspect-square w-16 shrink-0 overflow-hidden border border-border bg-muted/60 transition-colors hover:border-chart-3/60 lg:aspect-auto lg:w-full lg:min-h-0 lg:flex-1"
              >
                <img
                  src={fullGallery[MAX_VISIBLE_THUMBS]}
                  alt=""
                  aria-hidden="true"
                  width={200}
                  height={200}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-40"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/50 font-mono text-[11px] font-bold text-background">
                  +{hiddenThumbCount} More
                </span>
              </button>
            )}
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

        {/* How / Result / Technical Specification — aligned side by side, tight under the images */}
        <div className="mt-2 grid grid-cols-1 border border-border lg:grid-cols-3">
          <div className="border-b border-border p-4 lg:border-b-0 lg:border-r" id="section-how">
            <div className={sectionHeading}>
              <span className="text-chart-3">02</span> How
            </div>
            <ol className="mt-2 space-y-2">
              {project.how.map((h, i) => (
                <li key={h} className="flex gap-2 text-sm leading-snug text-muted-foreground">
                  <span className="font-mono text-xs text-chart-3">{String(i + 1).padStart(2, "0")}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-b border-border p-4 lg:border-b-0 lg:border-r" id="section-result">
            <div className={sectionHeading}>
              <span className="text-chart-3">03</span> Result
            </div>
            <ul className="mt-2 space-y-2">
              {project.result.map((r) => (
                <li key={r} className="flex gap-2 text-sm font-medium leading-snug">
                  <span className="text-chart-3">—</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 lg:sticky lg:top-6 lg:self-start" id="section-spec">
            <div className={sectionHeading}>Technical Specification</div>
            <div className="mt-2 space-y-1.5">
              {project.spec.map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="text-right font-mono text-xs">{s.value}</span>
                </div>
              ))}
            </div>
            <div className={`${label} mt-4`}>Skills</div>
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
        </div>
      </div>

      {/* Other Projects — horizontal scroll strip */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10">
          <div className="flex items-end justify-between">
            <div>
              <span className={label}>Ref. AP-NEXT / Other Projects</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">More Engineering Projects</h2>
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
                  <span className={`${label} absolute left-2 top-2 z-10 border border-border bg-background px-1.5 py-0.5`}>
                    {p.ref}
                  </span>
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
