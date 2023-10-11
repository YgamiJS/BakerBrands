import { Languages } from "@/types";

import en from "./en.json";
import ru from "./ru.json";

export const messages = { en, ru };

export const i18nConfig = {
  fallbackLocale: Languages.EN,
  legacy: false,
  locale: localStorage.getItem("lang") || navigator.language.slice(0, 2) || Languages.EN,
  messages
};

document.documentElement.lang =
  localStorage.getItem("lang") || navigator.language.slice(0, 2) || Languages.EN;
