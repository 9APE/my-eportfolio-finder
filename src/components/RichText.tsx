/**
 * Renders text containing simple **bold** markers as React nodes.
 * Keeps emphasis authoring inside the project data.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Strips **bold** markers for plain-text contexts (previews, truncation). */
export const stripMarks = (text: string) => text.replace(/\*\*/g, "");
