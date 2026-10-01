import type { Project } from "@/data/projects";
import { skillCategories, type SkillCategoryId } from "@/data/skillCategories";
import type { Lang } from "@/i18n/config";
import { buildKeywordPattern } from "@/lib/bold-keywords";

/**
 * Reads ?skills=… into the selection. One lens at a time: a link carrying several (an older
 * shared URL) keeps the first one it recognises, so the view always matches the chips.
 *
 * Still modelled as a list rather than a single id, because the scoring, sorting and
 * keyword code is written against a set and widening back out stays a one-line change.
 */
export function parseSkills(raw: string | undefined): SkillCategoryId[] {
  if (!raw) return [];
  const wanted = new Set(raw.split(",").map((s) => s.trim()));
  const first = skillCategories.find((c) => wanted.has(c.id));
  return first ? [first.id] : [];
}

/** Serialises selection back to the URL; undefined clears the param entirely. */
export function serializeSkills(selected: SkillCategoryId[]): string | undefined {
  return selected[0];
}

/** Picks a lens, replacing whichever was active. Clicking the active one clears it. */
export function selectSkill(selected: SkillCategoryId[], id: SkillCategoryId): SkillCategoryId[] {
  return selected[0] === id ? [] : [id];
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

/**
 * The paragraph for the active lens, or null when none is — in which case the caller keeps
 * the default intro. One lens, one text.
 */
export function buildIntro(
  selected: SkillCategoryId[],
  lang: Lang,
  template: (name: string, body: string) => string,
): string | null {
  const active = skillCategories.find((c) => c.id === selected[0]);
  if (!active) return null;
  return template(active.name[lang], active.body[lang]);
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
