<script setup lang="ts">
import type { IProduct } from "@/types";

import ProductRating from "./ProductRating.vue";

const props = defineProps<{
  result: IProduct;
}>();
</script>

<template>
  <li class="results__result">
    <RouterLink class="results__link" :to="`/Shop/${props.result.id}`">
      <div class="results__info">
        <img class="results__img" :src="props.result.img" :alt="props.result.name" />
        <div class="product-info">
          <h2 class="product-info__h2">
            {{ props.result.name }}
          </h2>
          <ProductRating :rating="props.result.rating" />
          <p class="product-info__price">{{ props.result.price }} {{ $t("PayСurrency") }}</p>
        </div>
      </div>
      <p class="results__see">{{ $t("Search.see") }}</p>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.results {
  &__result {
    background: $white;
  }

  &__link {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    padding: 18px 28px 18px 28px;
    color: $whiteGrey;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid $black;
    width: 100%;
    height: 100%;
    border-radius: 28px;
    min-height: 100px;

    &:last-child {
      border-radius: 28px 28px 0 0;
    }

    &:first-child {
      border-radius: 0 0 28px 28px;
    }
  }

  &__info {
    display: flex;
    gap: 20px;
  }

  &__img {
    width: 100px;
    border-radius: 8px;
    height: 80px;
  }

  &__see {
    color: $black;
  }
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  &__h2 {
  }

  &__price {
  }
}
</style>
