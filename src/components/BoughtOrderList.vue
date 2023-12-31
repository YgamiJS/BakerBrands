<script setup lang="ts">
import type { IDeliveryMethod, IOrderData } from "@/types";

import BoughtOrder from "./BoughtOrder.vue";

const emit = defineEmits<{
  (e: "estimateOrder", id: string): void;
}>();

const props = defineProps<{
  deliveryMethods: IDeliveryMethod[];
  orderProductsData: IOrderData[];
}>();
</script>

<template>
  <div class="Orders" v-if="props.orderProductsData.length > 0">
    <BoughtOrder
      class="Order__orderProduct"
      v-for="order of props.orderProductsData?.toReversed?.()"
      :key="order?.id"
      :delivery-method="
        deliveryMethods.find(
          (deliveryMethod) => deliveryMethod.name == order?.deliveryOrganization || ''
        )?.img || ''
      "
      @estimate-order="(id) => emit('estimateOrder', id)"
      :order="order"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Orders {
  background: $grey;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 30px;
  padding: 20px;
}
</style>
