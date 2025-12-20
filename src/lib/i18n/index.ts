import { createIsomorphicFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import dayjs from "dayjs";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { i18nConfig } from "@/lib/i18n/config";

export const i18nCookieName = "i18nextLng";

i18n.use(LanguageDetector).use(initReactI18next).init(i18nConfig);

export const setSSRLanguage = createIsomorphicFn().server(async () => {
	const lng = getCookie(i18nCookieName);
	await i18n.changeLanguage(lng || "en");
});

export const syncLanguage = (langKey: string) => {
	dayjs.locale(langKey);
};

i18n.on("languageChanged", (langKey) => syncLanguage(langKey));

export default i18n;
