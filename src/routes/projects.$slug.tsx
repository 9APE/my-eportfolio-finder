import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Expand } from "lucide-react";
import { getProject } from "@/data/projects";
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

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug)!;
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-10">
          <Link to="/" className={`${label} inline-flex items-center gap-2 hover:text-foreground`}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back to index
          </Link>
          <span className={label}>{project.category}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-12 sm:px-10">
        <span className={label}>Ref. {project.ref}</span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className="group relative aspect-[4/3] overflow-hidden border border-border bg-muted/60"
                aria-label={`Expand image ${i + 1}`}
              >
                <span className={`${label} absolute left-3 top-3 z-10 bg-background/80 px-2 py-1`}>
                  IMG {String(i + 1).padStart(2, "0")}
                </span>
                <img
                  src={img}
                  alt={`${project.title} view ${i + 1}`}
                  width={1408}
                  height={1104}
                  loading="lazy"
                  className="h-full w-full object-contain p-5"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background/90">
                    <Expand className="h-5 w-5" />
                  </span>
                </span>
              </button>
            ))}
          </div>

          <aside className="h-fit border border-border">
            <div className="border-b border-border px-4 py-3">
              <span className={label}>Technical Specification</span>
            </div>
            {project.spec.map((s) => (
              <div key={s.label} className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className={label}>{s.label}</span>
                <span className="font-mono text-xs">{s.value}</span>
              </div>
            ))}
            <div className="px-4 py-3">
              <span className={label}>Software</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.software.map((s) => (
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

        <section className="mt-14 max-w-3xl">
          <div className={label}>What</div>
          <p className="mt-3 text-lg leading-relaxed">{project.what}</p>

          <div className={`${label} mt-12`}>How</div>
          <ol className="mt-3 space-y-4">
            {project.how.map((h, i) => (
              <li key={h} className="flex gap-4">
                <span className="font-mono text-xs text-chart-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="leading-relaxed text-muted-foreground">{h}</span>
              </li>
            ))}
          </ol>

          <div className={`${label} mt-12 text-chart-3`}>Result</div>
          <ul className="mt-3 space-y-3">
            {project.result.map((r) => (
              <li key={r} className="flex gap-3 leading-relaxed">
                <span className="text-chart-3">—</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={project.gallery}
          index={lightbox}
          onClose={() => setLightbox(null)}
          onIndexChange={setLightbox}
        />
      )}
    </main>
  );
}
