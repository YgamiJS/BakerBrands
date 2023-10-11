<script setup lang="ts">
import type { IBasketProduct } from "@/types";

import { useBasketStore } from "@/store/basket";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineEmits<{
  (e: "decrement"): void;
  (e: "increment"): void;
}>();

const props = defineProps<{
  basketProductId: IBasketProduct["id"];
}>();

const { basketProducts } = storeToRefs(useBasketStore());

const currentBasketProduct = computed(() =>
  basketProducts.value.find((basketProduct) => basketProduct.id === props.basketProductId)
);
</script>

<template>
  <div class="counterFavoriteProduct">
    <button class="counterFavoriteProduct__button counterFavoriteProduct__increment" @click="$emit('increment')">+</button>
    <span class="counterFavoriteProduct__count">{{ currentBasketProduct?.count }}</span>
    <button class="counterFavoriteProduct__button counterFavoriteProduct__decrement" @click="$emit('decrement')">-</button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.counterFavoriteProduct {
  display: flex;
  align-items: center;
  gap: 10px;

  &__count {
    width: 20px;
    text-align: center;
    font-size: 18px;
  }
  
  &__button {
    background: $graySkeleton;
    cursor: pointer;
    font-size: 20px;
    border-radius: 14px;
    padding: 16px;
    outline: none;
    border: none;
    
    @media (min-width: 950px) {
      &:hover {
        background: $graySkeletonLoading;
      }
    }

    &:active { 
      background: $graySkeletonLoading;
    }
  }
}
</style>
