<script setup lang="ts">
import { type IBasketProductData } from "@/types";
import { Routes } from "@/types/enums/routes";
import { RouterLink } from "vue-router";

const props = defineProps<{
  orderProduct: IBasketProductData;
}>();
</script>

<template>
  <RouterLink class="Order" :to="`/${Routes.SHOP}/${props.orderProduct.id}`">
    <div class="Order__wrapper">
      <div class="Order__information">
        <img class="Order__img" :src="orderProduct.img" :alt="orderProduct.name" />
        <div class="Order__info">
          <p class="Order__name">{{ orderProduct.name }}</p>
          <p class="Order__description">{{ orderProduct.description }}</p>
        </div>
      </div>
      <div class="Order__wrap">
        <p class="Order__price">{{ orderProduct.price }} {{ $t("PayСurrency") }}</p>
        <p class="Order__count">{{ $t("Bought.things", { count: props.orderProduct.count }) }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Order {
  display: flex;
  justify-content: space-between;

  &__wrapper {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    width: 100%;
  }

  &__img {
    width: 100px;
    height: 100px;
  }

  &__information {
    display: flex;
    gap: 15px;
  }

  &__name {
    @include adaptiv-font(24, 20);
  }
}
</style>
