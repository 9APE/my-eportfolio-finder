import { Wrench } from "lucide-react";
import { projects } from "@/data/projects";

/** Ordered list of tools/skills: software first, then the rest, deduplicated. */
export const SKILLS: string[] = (() => {
  const seen = new Set<string>();
  const out: string[] = [];
  const push = (s: string) => {
    const k = s.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      out.push(s);
    }
  };
  for (const p of projects) for (const t of p.tags) push(t);
  for (const p of projects) for (const s of p.skills) push(s);
  return out;
})();

/** True when the project uses the given skill (matches tags or skills, tolerant of "HyperMesh" vs "Altair HyperMesh"). */
export function projectUsesSkill(p: (typeof projects)[number], skill: string) {
  const needle = skill.toLowerCase();
  return [...p.tags, ...p.skills].some((s) => {
    const hay = s.toLowerCase();
    return hay === needle || hay.includes(needle) || needle.includes(hay);
  });
}

type Props = {
  active: string | null;
  onHover: (skill: string | null) => void;
  onToggle: (skill: string) => void;
};

export function SkillExplorer({ active, onHover, onToggle }: Props) {
  return (
    <div className="mt-6 border border-border">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <Wrench className="h-3.5 w-3.5 text-chart-3" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Tools &amp; Skills — hover to see where each was used, click to pin
        </span>
      </div>
      <div className="flex flex-wrap gap-2 px-4 py-3">
        {SKILLS.map((s) => {
          const count = projects.filter((p) => projectUsesSkill(p, s)).length;
          const isActive = active === s;
          return (
            <button
              key={s}
              type="button"
              onMouseEnter={() => onHover(s)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(s)}
              onBlur={() => onHover(null)}
              onClick={() => onToggle(s)}
              aria-pressed={isActive}
              className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-150 ${
                isActive
                  ? "border-chart-3 bg-chart-3 text-background"
                  : "border-chart-3/40 text-chart-3 hover:border-chart-3 hover:bg-chart-3/10"
              }`}
            >
              {s}
              <span className={`ml-1.5 ${isActive ? "text-background/70" : "text-muted-foreground"}`}>
                ×{count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
