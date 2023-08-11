import en from "./en.json";
import ru from "./ru.json";

export const messages = { en, ru };

export const i18nConfig = {
  fallbackLocale: "en",
  legacy: false,
  locale: localStorage.getItem("lang") || navigator.language.slice(0, 2) || "en",
  messages
};

document.documentElement.lang =
  localStorage.getItem("lang") || navigator.language.slice(0, 2) || "en";
