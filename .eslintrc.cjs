/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
require("eslint-plugin-perfectionist");

module.exports = {
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:perfectionist/recommended-alphabetical"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  root: true,
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["*"]
      }
    ]
  }
};
