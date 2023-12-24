import type { IPlacingOrder } from "@/types";

import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlacingOrderStore = defineStore("placingorder", () => {
  const currentPlacingOrder = ref<IPlacingOrder>();

  const addCurrentPlacingOrder = (placingOrder: IPlacingOrder) =>
    (currentPlacingOrder.value = placingOrder);

  return {
    addCurrentPlacingOrder,
    currentPlacingOrder
  };
});
