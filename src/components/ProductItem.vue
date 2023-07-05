<script setup lang="ts">
import type { IProduct } from "@/types";

import { images } from "@/assets/images";
const { product } = defineProps<{ product: IProduct }>();
</script>

<template>
  <li class="product-list__item">
    <RouterLink class="product-list__link" :to="product.id">
      <img class="product-list__img" :src="product.img" :alt="product.name" />
      <div class="product-list__favorite" v-if="!product.favorite">
        <img
          class="product-list__favorite-img"
          :src="images.favorite"
          :title="$t('Shop.Product.addToFavorite')"
          :alt="$t('Shop.Product.addToFavorite')"
        />
      </div>
      <p class="product-list__name">
        {{ $t(`Categories.${product.category}`) }} {{ product.name }}
      </p>
      <p class="product-list__price">{{ product.price }} {{ $t("PayСurrency") }}</p>
      <div class="product-list__sizes">
        <p class="product-list__size" v-for="size of product.sizes" :key="size">{{ size }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.product-list {
  scroll-snap-stop: always;
  &__link {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 5px;
    text-align: center;
    color: $black;
  }

  &__img {
    max-height: 360px;
    margin-bottom: 10px;
  }

  &__favorite {
    background: $spacegrey;
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translate(-100%, -0%);
    padding: 12.19px 13px 13.37px 12px;
    width: 40px;
    height: 40px;
    border-radius: 0px 0px 0px 20px;
  }

  &__name {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }

  &__price {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }

  &__sizes {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  &__size {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: $whiteGrey;
    text-transform: uppercase;
  }
}
</style>
