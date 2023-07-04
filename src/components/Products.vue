<script setup lang="ts">
import type { IProduct } from "@/types";

import ProductItem from "./ProductItem.vue";

const { products } = defineProps<{
  products: IProduct[];
}>();
</script>

<template>
  <ul class="products-list">
    <ProductItem v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  width: 100%;
  gap: 15px;
}
</style>
