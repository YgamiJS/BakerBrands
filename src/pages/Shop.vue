<script setup lang="ts">
import type { IProduct } from "@/types";

import Filter from "@/components/Filter.vue";
import Location from "@/components/Location.vue";
import ProductItemSkeleton from "@/components/ProductItemSkeleton.vue";
import Products from "@/components/Products.vue";
import ShowMore from "@/components/ShowMore.vue";
import { useProductsStore } from "@/store/products";
import { storeToRefs } from "pinia";
import { onMounted, ref, watchEffect } from "vue";

const { fetchProducts, fetchProductsByCategory } = useProductsStore();
const { length, loading, products } = storeToRefs(useProductsStore());
const currentCategory = ref<IProduct["category"]>();

const onClick = async (category?: IProduct["category"]) => {
  currentCategory.value = category;
  await fetchProductsByCategory(category ?? currentCategory.value!);
};

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <main class="Shop">
    <section class="Products">
      <div class="Products__container container">
        <Location />
        <Filter @click="onClick">
          <template v-if="!loading">
            <Products :products="products" :length="length" />
            <ShowMore v-if="products.length < length" @click="onClick" />
          </template>
          <template v-else>
            <ul class="products-list">
              <ProductItemSkeleton v-for="n of 16" :key="n" />
            </ul>
          </template>
        </Filter>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  width: 100%;
  gap: 15px;
  list-style: none;
}
</style>
