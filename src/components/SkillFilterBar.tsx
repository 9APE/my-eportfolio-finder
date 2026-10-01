import { X } from "lucide-react";
import type { ReactNode } from "react";

import { skillCategories, type SkillCategoryId } from "@/data/skillCategories";
import { useLanguage } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

/**
 * The skill lenses, at the very top of the home page, with the intro paragraph they drive
 * directly underneath. The selection lives in the URL (?skills=), owned by the route, so a
 * filtered view is shareable and survives a refresh.
 *
 * Selecting a lens never hides a project — it reorders the index and re-leads the hero.
 * This component is presentational and deliberately sits outside the part of the page that
 * remounts on a filter change, so the chip you just clicked keeps focus.
 */
export function SkillFilterBar({
  selected,
  onToggle,
  onClear,
  intro,
  selectionKey,
  trailing,
}: {
  selected: SkillCategoryId[];
  onToggle: (id: SkillCategoryId) => void;
  onClear: () => void;
  /** Lens paragraph when a lens is active, otherwise the default intro. */
  intro: ReactNode;
  /** Changes whenever the selection does, so the paragraph re-animates. */
  selectionKey: string;
  /** Right-aligned slot on the top row — the language switcher lives here. */
  trailing?: ReactNode;
}) {
  const { lang, t } = useLanguage();
  const hasSelection = selected.length > 0;

  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-[1600px] px-6 py-6 sm:px-10">
        <div className="flex items-start justify-between gap-4">
          <span className={`${label} pt-1.5`}>{t.filterBySkill}</span>
          {trailing}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.filterBySkill}>
            {skillCategories.map((category) => {
              const active = selected.includes(category.id);
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggle(category.id)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 ${
                    active
                      ? "border-chart-3 bg-chart-3 text-background shadow-[0_2px_12px_-6px_var(--chart-3)]"
                      : "border-border bg-background text-muted-foreground hover:-translate-y-px hover:border-chart-3/60 hover:text-foreground"
                  }`}
                >
                  {category.label[lang]}
                </button>
              );
            })}
          </div>

          {hasSelection ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <button
                type="button"
                onClick={onClear}
                className={`${label} inline-flex items-center gap-1.5 border border-border bg-background px-2.5 py-1 transition-colors hover:border-chart-3 hover:text-foreground`}
              >
                <X className="h-3 w-3" aria-hidden="true" />
                {t.clearFilters}
              </button>
              <span className={`${label} text-chart-3`}>{t.sortedByRelevance}</span>
            </div>
          ) : (
            <span className={`${label} hidden lg:inline`}>{t.filterNote}</span>
          )}
        </div>

        {/* Keyed so the paragraph fades through on every change of lens */}
        <p
          key={selectionKey}
          aria-live="polite"
          className="lens-intro mt-5 max-w-4xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {intro}
        </p>
      </div>
    </section>
  );
}
