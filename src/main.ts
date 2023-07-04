import "@/assets/scss/App.scss";
import { firebaseApp } from "@/services/vuefire";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import { VueFire, VueFireAuth } from "vuefire";

import App from "./App.vue";
import { i18nConfig } from "./i18n";
import router from "./router";

const app = createApp(App);

app.use(createI18n(i18nConfig));
app.use(createPinia());
app.use(router);
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
});

app.mount("#app");
