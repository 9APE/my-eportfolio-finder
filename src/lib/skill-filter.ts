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

/** How many images the rotating hero keeps, so it never collapses to a single still. */
export const HERO_POOL_MIN = 3;

/**
 * Images the hero rotates through. Unfiltered that is every project; with a lens active it
 * narrows to the top-scoring tier, widened to HERO_POOL_MIN so there is always something
 * to cycle. `ordered` must already be sorted by relevance.
 *
 * This only affects the showcase. The project index below always lists all seven.
 */
export function heroPool(ordered: Project[], selected: SkillCategoryId[]): Project[] {
  if (!selected.length || !ordered.length) return ordered;
  const best = scoreProject(ordered[0]!, selected);
  if (best <= 0) return ordered;
  const tier = ordered.filter((p) => scoreProject(p, selected) === best);
  return tier.length >= HERO_POOL_MIN ? tier : ordered.slice(0, HERO_POOL_MIN);
}

/** "a", "a and b", "a, b and c" — separator and conjunction supplied per language. */
export function joinList(items: string[], and: string, separator = ", "): string {
  if (items.length <= 1) return items[0] ?? "";
  return `${items.slice(0, -1).join(separator)} ${and} ${items[items.length - 1]}`;
}

export type IntroCopy = {
  /** One lens: the full paragraph. */
  single: (names: string, body: string) => string;
  /** Several lenses: their key clauses combined, rather than every paragraph in full. */
  multi: (names: string, clauses: string) => string;
  and: string;
};

/** The lens paragraph, or null when no filter is active (caller keeps the default intro). */
export function buildIntro(
  selected: SkillCategoryId[],
  lang: Lang,
  copy: IntroCopy,
): string | null {
  const active = skillCategories.filter((c) => selected.includes(c.id));
  const first = active[0];
  if (!first) return null;

  const names = joinList(
    active.map((c) => c.name[lang]),
    copy.and,
  );
  if (active.length === 1) return copy.single(names, first.body[lang]);

  // Semicolons only, no conjunction: several clauses already contain "and" internally, and
  // a trailing "x and y" would read as though the last two belonged together.
  const clauses = active.map((c) => c.clause[lang]).join("; ");
  return copy.multi(names, clauses);
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
