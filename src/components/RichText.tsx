import { Fragment } from "react";

import { boldKeywords } from "@/lib/bold-keywords";

/**
 * Renders text containing simple **bold** markers as React nodes.
 * Keeps emphasis authoring inside the project data.
 *
 * `keywords` (optional) additionally bolds skill-filter matches, applied only to the
 * segments that are not already emphasised, so the two mechanisms never nest.
 */
export function RichText({ text, keywords }: { text: string; keywords?: string[] }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : keywords?.length ? (
          <Fragment key={i}>{boldKeywords(part, keywords)}</Fragment>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Strips **bold** markers for plain-text contexts (previews, truncation). */
export const stripMarks = (text: string) => text.replace(/\*\*/g, "");
