import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

import { useUserStore } from "./user";

export const useOrdersStore = defineStore("orders", () => {
  const orderProducts = useStorage<any>("orders", []);
  const loading = ref<boolean>(false);
  const { isAuth, user } = useUserStore();

  return {
    loading,
    orderProducts
  };
});
