<script setup lang="ts">
import type { IProduct } from "@/types";

import InFavoriteIcon from "@/assets/icons/InFavoriteIcon.vue";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

import ProductItemSwiper from "./ProductItemSwiper.vue";
import ProductRating from "./ProductRating.vue";

const props = defineProps<{ product: IProduct }>();

const { addFavoriteProduct, removeFavoriteProduct } = useFavoritesStore();
const { favoriteProducts } = storeToRefs(useFavoritesStore());

const productImgRef = ref<HTMLImageElement | null>(null);
const length = computed(() => props.product.images.length);
const fracktion = ref<number>(0);
const activeFracktion = ref<number>(0);

const isLike = computed(
  () =>
    !!favoriteProducts.value.find((favoriteProduct) => favoriteProduct.id == props.product.id)?.id
);

const handleMouseMove = (event: MouseEvent) => {
  if (props.product.images.length < 2) return;

  const imgWidth = (event.target as HTMLImageElement).clientWidth;
  const xPercentage = (event.offsetX / imgWidth) * 100;
  activeFracktion.value = Math.min(
    Math.ceil(xPercentage / fracktion.value),
    props.product.images.length
  );
};

const handleMouseLeave = () => {
  activeFracktion.value = 0;
};

const addOrRemoveToFavoriteProducts = async (product: IProduct) => {
  !isLike.value ? await addFavoriteProduct(product.id) : await removeFavoriteProduct(product.id);
};

onMounted(() => {
  fracktion.value =
    (productImgRef.value?.getBoundingClientRect()?.width &&
      productImgRef.value?.getBoundingClientRect()?.width / length.value / length.value) ||
    0;
});
</script>

<template>
  <li class="product-list__item">
    <RouterLink class="product-list__link" :to="`/Shop/${props.product.id}`">
      <div
        class="product-list-imgwrap"
        @pointermove="handleMouseMove"
        @pointerleave="handleMouseLeave"
      >
        <img
          class="product-list__img"
          :src="
            activeFracktion == 0 ? props.product.img : props.product.images[activeFracktion - 1]
          "
          ref="productImgRef"
        />
      </div>
      <ProductItemSwiper
        class="mob-swiper"
        :navigation="false"
        :currentProduct="props.product"
        :handleTouchStart="(event: TouchEvent) => event.stopPropagation()"
        :handleTouchEnd="handleMouseLeave"
      />
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
      <ProductRating :rating="props.product.rating" />
      <p class="product-list__price">{{ props.product.price }} {{ $t("PayСurrency") }}</p>
      <div class="product-list__sizes">
        <p class="product-list__size" v-for="size of props.product.sizes" :key="size">{{ size }}</p>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

@media (min-width: 760px) {
  :deep(.product-list__favorite:hover .product-list__favorite-img path) {
    stroke: $lowspacegrey;
  }
}

@media (max-width: 760px) {
  :deep(.product-list__favorite:active .product-list__favorite-img path) {
    stroke: $lowspacegrey;
  }
}

:deep(.product-list__inFavorite .product-list__favorite-img path) {
  stroke: $lowspacegrey;
}

.mob-swiper {
  @media (max-width: 950px) {
    display: block;
  }
}

.product-list-imgwrap {
  @media (max-width: 950px) {
    display: none;
  }
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
    background: $graySkeleton;
    width: 100%;
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
    z-index: 2;

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
