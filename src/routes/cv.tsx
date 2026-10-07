import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { CvDocument, CvDownloadLink } from "@/components/CvDocument";
import { SiteFooter } from "@/components/SiteFooter";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/i18n/context";

export const Route = createFileRoute("/cv")({
  head: () => ({
    meta: [
      { title: "Resume | Aurélien Pons" },
      {
        name: "description",
        content:
          "Resume of Aurélien Pons: mechanical engineering student specialising in composite structures, FEA and Formula Student design.",
      },
      { property: "og:title", content: "Resume | Aurélien Pons" },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: CvPage,
});

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

function CvPage() {
  const t = useT();

  return (
    <main className="cv-page site-bg min-h-screen text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-6 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              aria-label={t.backToPortfolio}
              title={t.backToPortfolio}
              className="glass-panel mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground/70 transition-colors hover:border-chart-3 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.cvTitle}</h1>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-3 sm:justify-end">
            <CvDownloadLink />
            <LanguageSwitcher />
          </div>
        </div>

        <div className="glass-panel mt-10 rounded-3xl p-6 sm:p-12">
          <CvDocument />
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className={`${label} glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors hover:border-chart-3 hover:text-foreground`}
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {t.backToPortfolio}
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
