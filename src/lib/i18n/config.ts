import type { InitOptions } from "i18next";
import locales from "./locales";

export type Language = {
	key: keyof typeof locales;
	dir?: "ltr" | "rtl";
	fontScale?: number;
};

export const DEFAULT_NAMESPACE = "common";

export const DEFAULT_LANGUAGE_KEY: Language["key"] = "en";

export type LanguageKey = (typeof AVAILABLE_LANGUAGES)[number]["key"];
export const AVAILABLE_LANGUAGES = [
	{
		key: "en",
	} as const,
	{
		key: "ar",
		dir: "rtl",
		fontScale: 1.2,
	} as const,
] satisfies Language[];

export const i18nConfig: InitOptions = {
	defaultNS: DEFAULT_NAMESPACE,
	// ns: keys(locales[DEFAULT_LANGUAGE_KEY]),
	resources: locales,
	fallbackLng: DEFAULT_LANGUAGE_KEY,
	supportedLngs: ["en", "ar"],
	detection: {
		caches: ["cookie"],
		cookieMinutes: 43_200, // 30 days
		cookieOptions: { path: "/", sameSite: "lax" },
	},
	returnNull: false,
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
};
