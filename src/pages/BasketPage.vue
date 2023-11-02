<script setup lang="ts">
import type { IProduct } from "@/types";

import { images } from "@/assets/images";
import BasketForm from "@/components/BasketForm.vue";
import BasketProduct from "@/components/BasketProduct.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import EmptyInfo from "@/components/UI/EmptyInfo.vue";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { decrementBasketProductCount, fetchDataOfBasketProducts, incrementBasketProductCount } =
  useBasketStore();
const { basketProducts, basketProductsData, loading } = storeToRefs(useBasketStore());
const { removeBasketProduct, removeBasketProductSize } = useBasketStore();
const { addFavoriteProduct, removeFavoriteProduct } = useFavoritesStore();

const removeBasketProductSizeMod = async (basketProductId: IProduct["id"], currentSize: string) => {
  const currentBasketProductDataIndex = basketProductsData.value.findIndex(
    (basketProduct) => basketProduct.id == basketProductId
  );

  if (
    currentBasketProductDataIndex === -1 ||
    basketProductsData.value[currentBasketProductDataIndex].sizes.length == 1
  )
    return;

  await removeBasketProductSize(basketProductId, currentSize);
};

onMounted(async () => {
  await fetchDataOfBasketProducts();
});
</script>

<template>
  <main class="BasketPage">
    <section class="Basket">
      <div class="Basket__container container">
        <Location />
        <GoBackButton />
        <div class="Basket__wrap" v-if="!loading">
          <ul class="basketproducts-list" v-if="basketProducts.length > 0">
            <BasketProduct
              v-for="basketProduct of basketProductsData"
              :key="basketProduct.id"
              :basket-product="basketProduct"
              @add-favorite-product="addFavoriteProduct"
              @remove-basket-product="removeBasketProduct"
              @remove-basket-product-size="removeBasketProductSizeMod"
              @remove-favorite-product="removeFavoriteProduct"
              @increment="incrementBasketProductCount(basketProduct.id)"
              @decrement="decrementBasketProductCount(basketProduct.id)"
            />
          </ul>
          <EmptyInfo
            v-else
            :title="$t('Basket.empty')"
            :description="$t('Basket.noBasketProducts')"
            :img="images.basket"
          />
          <BasketForm />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.BasketPage {
  flex: 1 0 auto;
  min-height: 85vh;
}

.Basket {
  height: 100%;

  &__container {
    height: 100%;
  }

  &__wrap {
    height: 100%;
  }
}
.basketproducts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
