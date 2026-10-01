export const LANGS = [
  { code: "en", label: "English", short: "EN" },
  { code: "fr", label: "Français", short: "FR" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "nl", label: "Nederlands", short: "NL" },
] as const;

export type Lang = (typeof LANGS)[number]["code"];

export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "portfolio-lang";

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && LANGS.some((l) => l.code === value);
}
