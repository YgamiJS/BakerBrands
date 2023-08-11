<script setup lang="ts">
import type { IFavoriteProduct } from "@/types";

import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineEmits<{
  (e: "decrement"): void;
  (e: "increment"): void;
}>();

const props = defineProps<{
  favoriteProductId: IFavoriteProduct["id"];
}>();

const { favoriteProducts } = storeToRefs(useFavoritesStore());

const currentFavoriteProduct = computed(() =>
  favoriteProducts.value.find((favoriteProduct) => favoriteProduct.id === props.favoriteProductId)
);
</script>

<template>
  <div class="counterFavoriteProduct">
    <button class="counterFavoriteProduct__increment" @click="$emit('increment')">+</button>
    <span class="counterFavoriteProduct__count">{{ currentFavoriteProduct?.count }}</span>
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
