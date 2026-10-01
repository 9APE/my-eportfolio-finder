import { X } from "lucide-react";

import { skillCategories, type SkillCategoryId } from "@/data/skillCategories";
import { useLanguage } from "@/i18n/context";

const label = "font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground";

/**
 * Multi-select skill lenses. Presentational: the selection lives in the URL (?skills=),
 * owned by the route, so the view is shareable and survives a refresh.
 *
 * Selecting a lens never hides a project; it only reorders. aria-pressed communicates the
 * toggle state, and the chips reuse the existing bordered mono styling rather than
 * introducing a new visual language.
 */
export function SkillFilterBar({
  selected,
  onToggle,
  onClear,
}: {
  selected: SkillCategoryId[];
  onToggle: (id: SkillCategoryId) => void;
  onClear: () => void;
}) {
  const { lang, t } = useLanguage();
  const hasSelection = selected.length > 0;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className={label}>{t.filterBySkill}</span>

      <div className="flex flex-wrap gap-2">
        {skillCategories.map((category) => {
          const active = selected.includes(category.id);
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(category.id)}
              className={`border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                active
                  ? "border-chart-3 bg-chart-3/10 text-chart-3"
                  : "border-border text-muted-foreground hover:border-chart-3/60 hover:text-foreground"
              }`}
            >
              {category.label[lang]}
            </button>
          );
        })}
      </div>

      {hasSelection && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <button
            type="button"
            onClick={onClear}
            className={`${label} inline-flex items-center gap-1.5 border border-border px-2.5 py-1 transition-colors hover:border-chart-3 hover:text-foreground`}
          >
            <X className="h-3 w-3" aria-hidden="true" />
            {t.clearFilters}
          </button>
          <span className={`${label} text-chart-3`}>{t.sortedByRelevance}</span>
        </div>
      )}
    </div>
  );
}
