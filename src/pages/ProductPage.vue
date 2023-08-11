<script setup lang="ts">
import type { IProduct } from "@/types";

import CounterFavoriteProduct from "@/components/CounterFavoriteProduct.vue";
import Location from "@/components/Location.vue";
import { useFavoritesStore } from "@/store/favorites";
import { useProductsStore } from "@/store/products";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";

const route = useRoute();

const id = ref<string>(route.params.id as string);

const { fetchCurrentProduct } = useProductsStore();
const { currentProduct, loading } = storeToRefs(useProductsStore());
const { addFavoriteProduct, decrementFavoriteProductCount, incrementFavoriteProductCount } =
  useFavoritesStore();
const { favoriteProducts } = storeToRefs(useFavoritesStore());
const selectedSizes = ref<string[]>([]);

const onSelectSize = (size: string) => {
  selectedSizes.value.push(size);
};

const addToFavoriteProducts = async (product: IProduct) => {
  await addFavoriteProduct(product);
};

const isLike = computed(
  () => !!favoriteProducts.value.find((favoriteProduct) => (favoriteProduct.id = id.value))
);

onMounted(() => fetchCurrentProduct(id.value));
</script>

<template>
  <main class="Product">
    <section class="Product-info">
      <div class="Product-info__container container" v-if="!loading">
        <Location />
        <h2 class="Product-info__h1">
          {{ $t(`Categories.${currentProduct?.category}`) }} {{ currentProduct?.name }}
        </h2>
        <div class="Product-info__info" v-if="!loading">
          <img class="Product-info__img" :src="currentProduct?.img" :alt="currentProduct?.name" />
          <div class="Product-info__content">
            <h2 class="Product-info__name">
              {{ $t(`Categories.${currentProduct?.category}`) }} {{ currentProduct?.name }}
            </h2>
            <p class="Product-info__description Product-info__p">
              {{ currentProduct?.description }}
            </p>
            <p class="Product-info__category Product-info__p">
              {{ $t("Categories.category") }} : {{ $t(`Categories.${currentProduct?.category}`) }}
            </p>
            <p class="Product-info__price Product-info__p">{{ currentProduct?.price }}</p>
            <p class="Product-info__new Product-info__p" v-if="currentProduct?.new">
              {{ $t("Product.new") }}
            </p>
            <p class="Product-info__popularity Product-info__p" v-if="currentProduct?.popularity">
              {{ $t("Product.popularity") }}
            </p>
            <div class="Product-info__sizes">
              <p
                class="Product-info__size"
                v-for="size of currentProduct?.sizes"
                @click="onSelectSize(size!)"
                :key="size"
              >
                {{ size }}
              </p>
            </div>
            <button
              class="Product-info__buy-button"
              v-if="!isLike"
              @click="addToFavoriteProducts(currentProduct!)"
            >
              {{ $t("Product.addToBasket") }}
            </button>
            <div class="Product-info__bought" v-else>
              <RouterLink to="">{{ $t("Product.goToBasket") }}</RouterLink>
              <CounterFavoriteProduct
                :favorite-product-id="id"
                @increment="incrementFavoriteProductCount(id)"
                @decrement="decrementFavoriteProductCount(id)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.Product {
  flex: 1 0 auto;
}
.Product-info {
  &__info {
    display: flex;
    justify-content: space-between;
    gap: 20%;
    flex-wrap: wrap;
  }

  &__h1 {
    margin-top: 30px;
    padding: 10px 0;
  }

  &__img {
    object-fit: fill;
    height: 50vh;
    max-width: 40%;
    width: 100%;

    @media (max-width: 767px) {
      max-width: 100%;
    }
  }

  &__content {
    background: $whiteSmoke;
    max-width: 40%;
    width: 100%;
    border-radius: 28px;
    padding: 20px;

    @media (max-width: 767px) {
      max-width: 100%;
    }
  }

  &__name {
  }

  &__description {
  }

  &__p {
  }

  &__category {
  }

  &__price {
  }

  &__new {
  }

  &__popularity {
  }

  &__sizes {
  }

  &__size {
  }

  &__buy-button {
    background: $lime50;
    font-style: 18px;
    font-weight: 500;
    color: $white;
    cursor: pointer;
    border-radius: 28px;
    outline: none;
    border: none;
    padding: 10px 20px;
  }

  &__bought {
  }
}
</style>
