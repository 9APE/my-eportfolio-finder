import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";

import { LANGS, type Lang } from "@/i18n/config";
import { useLanguage } from "@/i18n/context";

/** Language dropdown. Closes on outside click, Escape, or selection. */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  const choose = (code: Lang) => {
    setLang(code);
    setOpen(false);
  };

  // The caller owns positioning (className); the inner wrapper anchors the menu, so a
  // caller passing `absolute` can't collide with a hardcoded `relative` here.
  return (
    <div ref={rootRef} className={className}>
      <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.language}
        className="flex items-center gap-2 border border-border bg-background/90 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground backdrop-blur transition-colors hover:border-chart-3"
      >
        <Globe className="h-3.5 w-3.5 text-chart-3" aria-hidden="true" />
        {current.short}
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.language}
          className="absolute right-0 z-50 mt-1 min-w-[11rem] border border-border bg-background shadow-lg"
        >
          {LANGS.map((option) => (
            <li key={option.code}>
              <button
                type="button"
                role="option"
                aria-selected={option.code === lang}
                onClick={() => choose(option.code)}
                className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-muted/60 ${
                  option.code === lang ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {option.short}
                  </span>
                  <span className="ml-2">{option.label}</span>
                </span>
                {option.code === lang && <Check className="h-3.5 w-3.5 shrink-0 text-chart-3" />}
              </button>
            </li>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
}
