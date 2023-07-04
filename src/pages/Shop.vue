<script setup lang="ts">
import type { IProduct } from "@/types";

import Filter from "@/components/Filter.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import Products from "@/components/Products.vue";
import ShowMore from "@/components/ShowMore.vue";
import { useProductsStore } from "@/store/products";
import { ref } from "vue";
import { onMounted } from "vue";

const { fetchProducts, fetchProductsByCategory, length, loading, products } = useProductsStore();
const currentCategory = ref<IProduct["category"]>();

const onClick = async (category?: IProduct["category"]) => {
  console.log(category);
  currentCategory.value = category;
  await fetchProductsByCategory(currentCategory.value ?? category);
};

onMounted(async () => {
  await fetchProducts();
});
</script>

<template>
  <main class="Shop">
    <section class="Products">
      <div class="Products__container container">
        <template v-if="!loading">
          <Location />
          <Filter @click="onClick">
            <Products :products="products" :length="length" />
            <ShowMore v-if="products.length < length" @click="onClick" />
          </Filter>
        </template>
        <Loader v-else />
      </div>
    </section>
  </main>
</template>

<style scoped></style>
