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
    <button class="counterFavoriteProduct__increment" @click="$emit('increment')">+</button>
    <span class="counterFavoriteProduct__count">{{ currentBasketProduct?.count }}</span>
    <button class="counterFavoriteProduct__decrement" @click="$emit('decrement')">-</button>
  </div>
</template>

<style scoped lang="scss">
.counterFavoriteProduct {
  &__increment {
  }

  &__count {
  }

  &__decrement {
  }
}
</style>
