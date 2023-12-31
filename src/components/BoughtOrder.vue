<script setup lang="ts">
import { DeveliveryStatus, type IOrderData } from "@/types";
import { computed } from "vue";

import OrderProduct from "./OrderProduct.vue";

const emit = defineEmits<{
  (e: "estimateOrder", id: string): void;
}>();

const props = defineProps<{
  deliveryMethod: string;
  order: IOrderData;
}>();

const isArrived = computed(() => {
  return !!(new Date().getDate() >= new Date(props.order.transferDate).getDate());
});
</script>

<template>
  <div class="Order">
    <div class="Order__data">
      <div class="Order__information">
        <p class="Order__date Order__date_startdate">
          {{
            $t("Bought.orderstartdate", {
              day: new Date(props?.order?.startDate || "").getDate(),
              month: new Date(props?.order?.startDate || "").getMonth() + 1
            })
          }}
        </p>
        <p class="Order__date Order__date_transferdate">
          {{
            $t("Bought.ordertransferdata", {
              day: new Date(props?.order?.transferDate || "").getDate(),
              month: new Date(props?.order?.transferDate || "").getMonth() + 1
            })
          }}
        </p>
        <p class="Order__count">
          {{
            $t("Bought.things", {
              count: props.order.boughtProducts.reduce((a, b) => a + b.count, 0)
            })
          }}
        </p>
      </div>
      <p class="Order__id">№ {{ props.order.id }}</p>
      <p class="Order__status">
        {{
          $t("Bought.statusInfo", {
            status: $t(
              `Bought.status.${isArrived ? "arrived" : DeveliveryStatus[props.order.status]}`
            )
          })
        }}
      </p>
      <button
        class="Order__estimateOrder"
        @click="emit('estimateOrder', props.order.id)"
        v-if="isArrived"
      >
        {{ $t("Bought.estimateOrder") }}
      </button>
      <div class="Order__deliveryMethod">
        <img
          :src="props?.deliveryMethod"
          :alt="$t(`DeliveryMethods.${props.order?.deliveryOrganization}`)"
          class="Order__deliveryMethod-img"
        />
      </div>
    </div>
    <div class="Order__orderProducts">
      <OrderProduct
        v-for="boughtProduct of props.order.boughtProducts"
        :key="boughtProduct.id"
        :orderProduct="boughtProduct"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Order {
  background: $grey;
  padding: 15px 20px;
  color: $white;
  border-radius: 10px;
  width: 100%;

  &__data {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
  }

  &__id {
    word-break: break-all;
  }

  &__date {
    @include adaptiv-font(19, 17);

    &_transferdate {
      color: $lime70;
    }
  }

  &__deliveryMethod {
    width: 50px;
    height: 50px;
  }

  &__deliveryMethod-img {
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }

  &__orderProducts {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__estimateOrder {
    background: $white;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 8px 10px;
    color: $black;
    transition: all 300ms ease;
    border-radius: 8px;
    font-size: 17px;

    &:hover {
      background: $whiteSmoke;
    }
  }
}
</style>
