import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { DEFAULT_LANG, LANG_STORAGE_KEY, isLang, type Lang } from "./config";
import { UI, type UiCopy } from "./ui";
import { PROJECT_COPY } from "./project-copy";
import type { Project } from "@/data/projects";

type LanguageContextValue = {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: UiCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start on the default so the server render and the first client render agree;
  // the stored/browser preference is applied in an effect, after hydration.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    let preferred: Lang | null = null;
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (isLang(stored)) preferred = stored;
    } catch {
      /* storage unavailable */
    }
    if (!preferred) {
      const browser = navigator.language?.slice(0, 2).toLowerCase();
      if (isLang(browser)) preferred = browser;
    }
    if (preferred && preferred !== DEFAULT_LANG) setLangState(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: UI[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  // Falling back to English rather than throwing keeps any component usable in isolation.
  if (!ctx) return { lang: DEFAULT_LANG, setLang: () => {}, t: UI[DEFAULT_LANG] };
  return ctx;
}

/** Convenience hook for components that only need the UI strings. */
export function useT(): UiCopy {
  return useLanguage().t;
}

/**
 * Returns the project with translated copy applied. Any field without a translation keeps
 * its English value, so a missing entry degrades to English instead of rendering blank.
 */
export function localizeProject(project: Project, lang: Lang): Project {
  if (lang === "en") return project;
  const copy = PROJECT_COPY[lang]?.[project.slug];
  if (!copy) return project;
  return { ...project, ...copy };
}

/** Localises the whole list, preserving order. */
export function localizeProjects(list: Project[], lang: Lang): Project[] {
  return lang === "en" ? list : list.map((p) => localizeProject(p, lang));
}
