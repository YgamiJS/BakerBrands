<script setup lang="ts">
import type { IProduct } from "@/types";

import InFavoriteIcon from "@/assets/icons/InFavoriteIcon.vue";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed } from "vue";

import ProductRating from "./ProductRating.vue";

const props = defineProps<{ product: IProduct }>();
const { addFavoriteProduct, removeFavoriteProduct } = useFavoritesStore();
const { favoriteProducts } = storeToRefs(useFavoritesStore());

const isLike = computed(
  () =>
    !!favoriteProducts.value.find((favoriteProduct) => favoriteProduct.id == props.product.id)?.id
);

const addOrRemoveToFavoriteProducts = async (product: IProduct) => {
  !isLike.value ? await addFavoriteProduct(product) : await removeFavoriteProduct(product.id);
};
</script>

<template>
  <li class="product-list__item">
    <RouterLink class="product-list__link" :to="props.product.id">
      <img class="product-list__img" :src="props.product.img" :alt="props.product.name" />
      <div
        class="product-list__favorite"
        :class="{ 'product-list__inFavorite': isLike }"
        :description="
          !isLike ? $t('Shop.Product.addToFavorite') : $t('Shop.Product.removeFromFavorite')
        "
        @click.prevent="addOrRemoveToFavoriteProducts(props.product)"
      >
        <InFavoriteIcon class="product-list__favorite-img" />
      </div>
      <p class="product-list__name">
        {{ $t(`Categories.${props.product.category}`) }} {{ props.product.name }}
      </p>
      <ProductRating :product="props.product" />
      <p class="product-list__price">{{ props.product.price }} {{ $t("PayСurrency") }}</p>
      <div class="product-list__sizes">
        <p class="product-list__size" v-for="size of props.product.sizes" :key="size">{{ size }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

:deep(.product-list__favorite:hover .product-list__favorite-img path) {
  stroke: $lowspacegrey;
}

:deep(.product-list__inFavorite .product-list__favorite-img path) {
  stroke: $lowspacegrey;
}

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
    z-index: -1;
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

    @media (min-width: 950px) {
      &:hover::after {
        content: attr(description);
        border-radius: 8px;
        z-index: 100;
        background: $black;
        padding: 5px 10px;
        position: absolute;
        color: $white;
      }
    }
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
