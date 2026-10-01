import type { ReactNode } from "react";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * One alternation of all active keywords, longest first so a phrase wins over a single
 * word inside it ("torsional stiffness" rather than just "stiffness").
 *
 * Boundaries use Unicode letter/number classes rather than \b, because \b is ASCII-only
 * and would mis-fire around accented words ("corrélé", "Prüfstandsdaten").
 */
export function buildKeywordPattern(keywords: string[]): RegExp | null {
  const cleaned = [...new Set(keywords.map((k) => k.trim()).filter(Boolean))].sort(
    (a, b) => b.length - a.length,
  );
  if (!cleaned.length) return null;
  const body = cleaned.map(escapeRegExp).join("|");
  try {
    return new RegExp(`(?<![\\p{L}\\p{N}])(?:${body})(?![\\p{L}\\p{N}])`, "giu");
  } catch {
    // Lookbehind is unsupported on some older engines; degrade to ASCII word boundaries
    // rather than letting a regex SyntaxError take the page down.
    try {
      return new RegExp(`\\b(?:${body})\\b`, "gi");
    } catch {
      return null;
    }
  }
}

/**
 * Wraps whole-word/phrase keyword matches in <strong>. Case-insensitive, render-time only:
 * the source string is never modified. Returns the plain string when nothing matches.
 */
export function boldKeywords(text: string, activeKeywords: string[]): ReactNode {
  const pattern = buildKeywordPattern(activeKeywords);
  if (!pattern) return text;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match[0].length === 0) {
      pattern.lastIndex += 1; // defensive: never spin on a zero-length match
      continue;
    }
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <strong key={`kw-${key++}`} className="font-semibold text-foreground">
        {match[0]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (!parts.length) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
