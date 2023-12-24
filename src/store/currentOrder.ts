import type { IOrder } from "@/types";

import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentOrderStore = defineStore("currentorder", () => {
  const currentOrder = ref<IOrder | null>(null);

  const setCurrentOrder = (order: IOrder) => {
    currentOrder.value = order;
  };

  return {
    currentOrder,
    setCurrentOrder
  };
});
