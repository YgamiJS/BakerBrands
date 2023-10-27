import type { IBoughtProduct } from "@/types";

import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useAuthenticationStore } from "./authentication";

export const useOrdersStore = defineStore("boughts", () => {
  const boughtsProducts = useStorage<IBoughtProduct[]>("boughts", []);
  const loading = ref<boolean>(false);
  const { authentication, isAuth } = useAuthenticationStore();

  return {
    boughtsProducts,
    loading
  };
});
