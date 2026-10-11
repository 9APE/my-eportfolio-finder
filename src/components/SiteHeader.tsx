import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText, Linkedin, Mail, MessageSquare } from "lucide-react";

import { useFeedback } from "@/components/feedback-context";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useT } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";
const pad = (n: number) => String(n).padStart(2, "0");

/** Height of the header in px: where the big title counts as scrolled past. */
const HEADER_PX = 56;

type Zone = "top" | "projects" | "cv";

/**
 * The home page header, attached to the top at all times.
 * - Left: the Feedback button, then the name, which only appears once the big title in the
 *   hero has scrolled out of view (until then the name is already on screen, large).
 * - Centre: where you are: which project, or the CV.
 * - Right: Resume, email, LinkedIn and the Feedback button.
 */
export function SiteHeader({ activeProject, total }: { activeProject: number; total: number }) {
  const t = useT();
  const { openFeedback } = useFeedback();
  const [nameVisible, setNameVisible] = useState(false);
  const [zone, setZone] = useState<Zone>("top");

  useEffect(() => {
    const update = () => {
      const title = document.getElementById("hero-title");
      setNameVisible(title ? title.getBoundingClientRect().bottom < HEADER_PX : window.scrollY > 200);

      const vh = window.innerHeight;
      const top = (id: string) => document.getElementById(id)?.getBoundingClientRect().top;
      const cvTop = top("cv");
      const projectsTop = top("projects");
      if (cvTop !== undefined && cvTop < vh * 0.5) setZone("cv");
      else if (projectsTop !== undefined && projectsTop < HEADER_PX + 40) setZone("projects");
      else setZone("top");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 sm:px-10 md:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 items-center gap-3">
          <LanguageSwitcher className="shrink-0" align="left" />
          <span
            aria-hidden={!nameVisible}
            className={`truncate text-sm font-bold tracking-tight transition-[opacity,transform,visibility] duration-300 ${
              nameVisible ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
            }`}
          >
            Aurélien Pons
          </span>
        </div>

        <span className={`${label} hidden whitespace-nowrap tabular-nums md:block`}>
          {zone === "cv"
            ? t.cvTitle
            : zone === "projects"
              ? t.projectCounter(pad(activeProject + 1), pad(total))
              : ""}
        </span>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <Link to="/cv" aria-label={t.resume} className="flex items-center gap-2 text-sm hover:text-chart-3">
            <FileText className="h-4 w-4 text-chart-3" aria-hidden="true" />
            <span className="hidden lg:inline">{t.resume}</span>
          </Link>
          <a
            href="mailto:ariimoanapons@gmail.com"
            aria-label={t.emailAria}
            className="flex items-center gap-2 text-sm hover:text-chart-3"
          >
            <Mail className="h-4 w-4 text-chart-3" aria-hidden="true" />
            <span className="hidden xl:inline">ariimoanapons@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/aurelienpons2004"
            target="_blank"
            rel="noreferrer"
            aria-label={t.linkedinAria}
            className="flex items-center gap-2 text-sm hover:text-chart-3"
          >
            <Linkedin className="h-4 w-4 text-chart-3" aria-hidden="true" />
            <span className="hidden xl:inline">LinkedIn</span>
          </a>
          <button
            type="button"
            onClick={openFeedback}
            aria-label={t.feedbackNav}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border/80 bg-background/70 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground backdrop-blur-md transition-colors hover:border-chart-3"
          >
            <MessageSquare className="h-3.5 w-3.5 text-chart-3" aria-hidden="true" />
            <span className="hidden sm:inline">{t.feedbackNav}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
