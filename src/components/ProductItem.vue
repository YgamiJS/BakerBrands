<script setup lang="ts">
import type { IProduct } from "@/types";

import { images } from "@/assets/images";
import { useFavoritesStore } from "@/store/favorites";
import { computed } from "vue";

const props = defineProps<{ product: IProduct }>();
const { favoriteProducts } = useFavoritesStore();

const isLike = computed(
  () => !!favoriteProducts.find((favoriteProduct) => (favoriteProduct.id = props.product.id))
);
</script>

<template>
  <li class="product-list__item">
    <RouterLink class="product-list__link" :to="props.product.id">
      <img class="product-list__img" :src="props.product.img" :alt="props.product.name" />
      <div class="product-list__favorite" v-if="!isLike">
        <img
          class="product-list__favorite-img"
          :src="images.favorite"
          :title="$t('Shop.Product.addToFavorite')"
          :alt="$t('Shop.Product.addToFavorite')"
        />
      </div>
      <p class="product-list__name">
        {{ $t(`Categories.${props.product.category}`) }} {{ props.product.name }}
      </p>
      <div class="product-list__rating">
        <div
          class="product-list__star"
          v-for="n of 5"
          :key="n"
          :class="{ active: n <= props.product.rating.rating }"
        ></div>
      </div>
      <p class="product-list__price">{{ props.product.price }} {{ $t("PayСurrency") }}</p>
      <div class="product-list__sizes">
        <p class="product-list__size" v-for="size of props.product.sizes" :key="size">{{ size }}</p>
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
    height: 360px;
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

  &__rating {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__star {
    background: $whiteGrey;
    width: 20px;
    height: 20px;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    &.active {
      background: $yellow;
    }
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
