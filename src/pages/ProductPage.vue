<script setup lang="ts">
import Location from "@/components/Location.vue";
import { useProductsStore } from "@/store/products";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";

const route = useRoute();

const { fetchCurrentProduct } = useProductsStore();
const { currentProduct, loading } = storeToRefs(useProductsStore());
const selectedSizes = ref<string[]>([]);

const onSelectSize = (size: string) => {
  selectedSizes.value.push(size);
};

onMounted(() => fetchCurrentProduct(route.params.id as string));
</script>

<template>
  <main class="Product">
    <section class="Product-info">
      <div class="Product-info__container container">
        <Location />
        <div class="Product-info__info" v-if="!loading">
          <img class="Product-info__img" :src="currentProduct?.img" :alt="currentProduct?.name" />
          <div class="Product-info__content">
            <h2 class="Product-info__name">
              {{ $t(`Categories.${currentProduct?.category}`) }}{{ currentProduct?.name }}
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
            <button class="Product-info__buy-button" v-if="!currentProduct?.favorite">
              {{ $t("Product.addToBasket") }}
            </button>
            <div class="Product-info__bought" v-else>
              <RouterLink to="">{{ $t("Product.goToBasket") }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
