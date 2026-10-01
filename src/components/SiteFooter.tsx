import { ArrowRight, Mail, MessageSquare } from "lucide-react";

import { useFeedback } from "@/components/feedback-context";
import { useT } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

/**
 * One footer for the whole site: name and discipline, then the feedback call to action,
 * then contact. The feedback button used to sit in its own strip below this block, which
 * read as two competing footers; it is the same dialog, just reachable from here now.
 */
export function SiteFooter() {
  const t = useT();
  const { openFeedback } = useFeedback();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-7 px-6 py-14 text-center sm:px-10">
        <div>
          <div className="text-2xl font-bold tracking-tight sm:text-3xl">Aurélien Pons</div>
          <div className={`${label} mt-2`}>{t.footerRole}</div>
        </div>

        <button
          type="button"
          onClick={openFeedback}
          className="group inline-flex max-w-full items-center justify-center gap-2.5 border border-feedback bg-feedback px-6 py-3 text-sm font-semibold tracking-tight text-feedback-foreground shadow-[0_10px_26px_-14px_var(--feedback)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_var(--feedback)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-feedback focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="text-balance">{t.feedbackTrigger}</span>
          <ArrowRight
            className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </button>

        <a
          href="mailto:ariimoanapons@gmail.com"
          className={`${label} inline-flex items-center gap-2 transition-colors hover:text-foreground`}
        >
          <Mail className="h-3.5 w-3.5 text-chart-3" aria-hidden="true" />
          ariimoanapons@gmail.com
        </a>
      </div>
    </footer>
  );
}
