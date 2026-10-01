import type { Project } from "@/data/projects";
import { skillCategories, type SkillCategoryId } from "@/data/skillCategories";
import type { Lang } from "@/i18n/config";
import { buildKeywordPattern } from "@/lib/bold-keywords";

/** Reads ?skills=a,b into a clean, de-duplicated list of known category ids. */
export function parseSkills(raw: string | undefined): SkillCategoryId[] {
  if (!raw) return [];
  const wanted = new Set(raw.split(",").map((s) => s.trim()));
  // Iterate the canonical list so the result keeps a stable, declaration order.
  return skillCategories.filter((c) => wanted.has(c.id)).map((c) => c.id);
}

/** Serialises selection back to the URL; undefined clears the param entirely. */
export function serializeSkills(selected: SkillCategoryId[]): string | undefined {
  return selected.length ? selected.join(",") : undefined;
}

export function toggleSkill(selected: SkillCategoryId[], id: SkillCategoryId): SkillCategoryId[] {
  const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
  return skillCategories.filter((c) => next.includes(c.id)).map((c) => c.id);
}

/** Summed relevance across the selected lenses. 0 when nothing is selected. */
export function scoreProject(project: Project, selected: SkillCategoryId[]): number {
  return selected.reduce((sum, id) => sum + (project.relevance?.[id] ?? 0), 0);
}

/**
 * Highest combined relevance first. Nothing is ever removed — ties and zero-scoring
 * projects keep their curated order, because Array.prototype.sort is stable.
 */
export function sortByRelevance(projects: Project[], selected: SkillCategoryId[]): Project[] {
  if (!selected.length) return projects;
  return [...projects].sort((a, b) => scoreProject(b, selected) - scoreProject(a, selected));
}

/** "a", "a and b", "a, b and c" — conjunction supplied per language. */
export function joinFragments(fragments: string[], and: string): string {
  if (fragments.length <= 1) return fragments[0] ?? "";
  return `${fragments.slice(0, -1).join(", ")} ${and} ${fragments[fragments.length - 1]}`;
}

/** The lens sentence, or null when no filter is active (caller keeps the default intro). */
export function buildIntro(
  selected: SkillCategoryId[],
  lang: Lang,
  template: (lens: string) => string,
  and: string,
): string | null {
  if (!selected.length) return null;
  const fragments = skillCategories
    .filter((c) => selected.includes(c.id))
    .map((c) => c.introFragment[lang]);
  return template(joinFragments(fragments, and));
}

/** Keywords for the active lenses, in the current language. */
export function activeKeywords(selected: SkillCategoryId[], lang: Lang): string[] {
  if (!selected.length) return [];
  return skillCategories
    .filter((c) => selected.includes(c.id))
    .flatMap((c) => c.keywords[lang]);
}

function clamp(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

/**
 * Card preview text. With no lens active this is just the opening of the description, so
 * the unfiltered view is unchanged. With a lens active it starts at the first keyword
 * match instead, otherwise the matched term is usually past the cut-off and the reader
 * never sees why the project ranked.
 */
export function excerptAround(text: string, keywords: string[], maxLength: number): string {
  if (!keywords.length) return clamp(text, maxLength);

  const pattern = buildKeywordPattern(keywords);
  const match = pattern?.exec(text);
  if (!match) return clamp(text, maxLength);

  // Already visible in the default window — keep the natural opening.
  if (match.index + match[0].length <= maxLength) return clamp(text, maxLength);

  let start = Math.max(0, match.index - 24);
  if (start > 0) {
    const space = text.indexOf(" ", start);
    if (space !== -1 && space < match.index) start = space + 1;
  }
  const prefix = start > 0 ? "…" : "";
  return `${prefix}${clamp(text.slice(start), maxLength)}`;
}
