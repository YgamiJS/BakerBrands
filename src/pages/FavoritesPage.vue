<script setup lang="ts">
import { images } from "@/assets/images";
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import ProductItem from "@/components/ProductItem.vue";
import ProductItemSkeleton from "@/components/ProductItemSkeleton.vue";
import ProductsList from "@/components/ProductsList.vue";
import EmptyInfo from "@/components/UI/EmptyInfo.vue";
import ErrorInfo from "@/components/UI/ErrorInfo.vue";
import { useFavoritesStore } from "@/store/favorites";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { fetchDataOfFavoriteProducts, fetchFavoriteProducts } = useFavoritesStore();
const { error, favoriteProductsData, loading } = storeToRefs(useFavoritesStore());
const { lastWathed } = useWatchedProductsStore();
const { error: errorWatched, watchedProductsData } = storeToRefs(useWatchedProductsStore());

onMounted(async () => {
  await fetchFavoriteProducts();
  await fetchDataOfFavoriteProducts();
  await lastWathed();
});
</script>

<template>
  <main class="Favorites">
    <section class="Favorites-list">
      <div class="Favorites-list__container container">
        <Location />
        <GoBackButton />
        <h1 class="Favorites-list__h1">{{ $t("Favorites.favorites") }}</h1>
        <ErrorInfo
          v-if="error?.message || errorWatched?.message"
          :text="$t('Favorites.somethingWentWrong')"
        />
        <template v-else-if="!loading">
          <template v-if="favoriteProductsData.length > 0">
            <ul class="like-list">
              <ProductItem
                v-for="favoriteProduct of favoriteProductsData"
                :key="favoriteProduct.id"
                :product="favoriteProduct"
              />
            </ul>
            <h2 class="watchedProducts" v-if="watchedProductsData.length > 0">
              {{ $t("Favorites.watchedProducts") }}
            </h2>
            <ProductsList :products="watchedProductsData" />
          </template>
          <EmptyInfo
            :title="$t('Favorites.empty')"
            :description="$t('Favorites.noFavoriteProducts')"
            :img="images.noResults"
            v-else
          />
        </template>
        <template v-else>
          <ul class="like-list">
            <ProductItemSkeleton v-for="n of 16" :key="n" />
          </ul>
        </template>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Favorites {
  flex: 1 0 auto;
  min-height: 85vh;
}
.Favorites-list {
  height: 100%;

  &__container {
    height: 100%;
  }

  &__h1 {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 23px;
    color: $black;
    margin: 25px 0;
  }
}
.like-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  width: 100%;
  gap: 15px;
  list-style: none;
}

.watchedProducts {
  font-weight: 400;
  @include adaptiv-font(32, 24);
  line-height: 23px;
  color: $black;
  margin: 25px 0;
}
</style>
