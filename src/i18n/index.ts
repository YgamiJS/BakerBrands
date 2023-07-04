import en from "./en.json";
import ru from "./ru.json";

export const messages = { en, ru };

export const i18nConfig = {
  fallbackLocale: "en",
  legacy: false,
  locale: navigator.language.slice(0, 2) || "en",
  messages
};
