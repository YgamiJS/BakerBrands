import type { IBoughtProduct } from "@/types";

import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useUserStore } from "./user";

export const useOrdersStore = defineStore("boughts", () => {
  const boughtsProducts = useStorage<IBoughtProduct[]>("boughts", []);
  const loading = ref<boolean>(false);
  const { isAuth, user } = useUserStore();

  return {
    boughtsProducts,
    loading
  };
});
