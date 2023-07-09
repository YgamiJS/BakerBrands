<script setup lang="ts">
import type { IProduct } from "@/types";

import FilterMenu from "@/components/FilterMenu.vue";
import Location from "@/components/Location.vue";
import ProductItemSkeleton from "@/components/ProductItemSkeleton.vue";
import ProductsList from "@/components/ProductsList.vue";
import ShowMore from "@/components/ShowMore.vue";
import { useProductsStore } from "@/store/products";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { fetchProducts, fetchProductsByCategory } = useProductsStore();
const { length, loading, products } = storeToRefs(useProductsStore());
const currentCategory = ref<IProduct["category"]>();

const { t } = useI18n();

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
        <FilterMenu @click="onClick">
          <template v-if="!loading">
            <ProductsList :products="products" :length="length" v-if="products.length > 0" />
            <div class="empty" v-else>
              <h1 class="empty__h1">{{ $t("Shop.Empty.noProducts") }}</h1>
              <p class="empty__p">
                {{
                  $t("Shop.Empty.noProductsByCategory", {
                    category: t(`Categories.${currentCategory}`)
                  })
                }}
              </p>
            </div>
            <ShowMore v-if="products.length < length" @click="onClick" />
          </template>
          <template v-else>
            <ul class="products-list">
              <ProductItemSkeleton v-for="n of 16" :key="n" />
            </ul>
          </template>
        </FilterMenu>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Shop {
  flex: 1 0 auto;
}

.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  width: 100%;
  gap: 15px;
  list-style: none;
}

.empty {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  @media (max-width: 950px) {
    height: 200px;
  }

  &__h1 {
    font-weight: 400;
    font-size: 24px;
    line-height: 23px;
    color: $black;
  }

  &__p {
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    color: $black;
  }
}
</style>
