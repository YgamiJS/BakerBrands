<script setup lang="ts">
import { images } from "@/assets/images";
import BasketForm from "@/components/BasketForm.vue";
import BasketProduct from "@/components/BasketProduct.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import EmptyInfo from "@/components/UI/EmptyInfo.vue";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { usePlacingOrderStore } from "@/store/placingorder";
import { type IProduct, Routes } from "@/types";
import { uuid } from "@/utils";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const { decrementBasketProductCount, fetchDataOfBasketProducts, incrementBasketProductCount } =
  useBasketStore();
const { basketProducts, basketProductsData, loading } = storeToRefs(useBasketStore());
const { addCurrentPlacingOrder } = usePlacingOrderStore();
const { clearBasketProducts, removeBasketProduct, removeBasketProductSize } = useBasketStore();
const { addFavoriteProduct, removeFavoriteProduct } = useFavoritesStore();
const selectedBasketProducts = ref<IProduct["id"][]>([]);
const error = ref<any | null>();

const basketProductsCount = computed<number>(() =>
  basketProducts.value.reduce((a, b) => a + b.count, 0)
);

const totalBasketProductsPrice = computed<number>(() =>
  basketProductsData.value.reduce((a, b) => a + b.price * b.count, 0)
);

const totalBasketProductsDiscount = computed<number>(() =>
  basketProductsData.value.reduce((a, b) => a + (b?.oldprice ?? 0) * b.count, 0)
);

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

const clearSelectedBasketProducts = async () => {
  try {
    await Promise.all(
      selectedBasketProducts.value.map(
        async (selectedBasketProductId) => await removeBasketProduct(selectedBasketProductId)
      )
    );
  } catch (err) {
    error.value = err;
  }
};

const addSelectedBasketProduct = (id: IProduct["id"]) => {
  selectedBasketProducts.value.push(id);
};

const addSelectedBasketProductMod = (id: IProduct["id"]) => {
  !selectedBasketProducts.value.includes(id) && addSelectedBasketProduct(id);
};

const removeSelectedBasketProduct = (id: IProduct["id"]) => {
  selectedBasketProducts.value = selectedBasketProducts.value.filter(
    (selectedBasketProductId) => selectedBasketProductId !== id
  );
};

const addOrRemoveSelectedBasketProduct = (id: IProduct["id"]) =>
  selectedBasketProducts.value.includes(id)
    ? removeSelectedBasketProduct(id)
    : addSelectedBasketProduct(id);

const toggleSelectAllBasketProducts = () => {
  selectedBasketProducts.value.length > 0
    ? selectedBasketProducts.value.forEach((selectedBasketProductId) =>
        addOrRemoveSelectedBasketProduct(selectedBasketProductId)
      )
    : basketProductsData.value.forEach((selectedBasketProduct) =>
        addSelectedBasketProduct(selectedBasketProduct.id)
      );
};

const addPlacingOrder = () =>
  addCurrentPlacingOrder({ id: uuid(), sum: totalBasketProductsPrice.value });

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
        <h1 class="Basket__h1">{{ $t("Basket.basket") }}</h1>
        <Loader class="Basket__loader" v-if="loading" />
        <div class="Basket__wrap" v-else>
          <template v-if="basketProducts.length > 0">
            <div class="basketproducts-list-wrap">
              <div class="Basket-panel">
                <button
                  class="Basket-panel__button Basket-panel__toggleSelected"
                  @click="toggleSelectAllBasketProducts"
                >
                  {{ $t("Basket.toggleSelectedBasketProducts") }}
                </button>
                <button
                  class="Basket-panel__button Basket-panel__clearSelected"
                  v-if="selectedBasketProducts.length > 0"
                  @click="clearSelectedBasketProducts"
                >
                  {{ $t("Basket.clearAllSelectedBasketProducts") }}
                </button>
                <button
                  class="Basket-panel__button Basket-panel__clear"
                  @click="clearBasketProducts"
                >
                  {{ $t("Basket.clearAll") }}
                </button>
              </div>
              <ul class="basketproducts-list" v-if="basketProducts.length > 0">
                <BasketProduct
                  v-for="basketProduct of basketProductsData"
                  :key="basketProduct.id"
                  :basket-product="basketProduct"
                  :selectedProducts="selectedBasketProducts"
                  @add-favorite-product="addFavoriteProduct"
                  @remove-basket-product="removeBasketProduct"
                  @remove-basket-product-size="removeBasketProductSizeMod"
                  @remove-favorite-product="removeFavoriteProduct"
                  @add-or-remove-selected-basket-product="addOrRemoveSelectedBasketProduct"
                  @increment="incrementBasketProductCount(basketProduct.id)"
                  @decrement="decrementBasketProductCount(basketProduct.id)"
                  @add-selected-basket-product="addSelectedBasketProductMod"
                />
              </ul>
            </div>
            <div class="placingOrder">
              <template v-if="selectedBasketProducts.length > 0">
                <RouterLink
                  class="placingOrder__link"
                  @click="addPlacingOrder"
                  :to="{ name: Routes.PLACINGORDER }"
                  >{{ $t("Basket.placingOrder") }}</RouterLink
                >
                <div class="placingOrder-info">
                  <div class="placingOrder-info__trait">
                    <span class="placingOrder-info__name placingOrder-info__name_head">{{
                      $t("Basket.yoursBasket")
                    }}</span>
                    <span class="placingOrder-info__data"></span>
                  </div>
                  <div class="placingOrder-info__trait">
                    <span class="placingOrder-info__name">{{
                      $t("Basket.goods", { count: basketProductsCount })
                    }}</span>
                    <span class="placingOrder-info__data placingOrder-info__data_price"
                      >{{ totalBasketProductsPrice }} {{ $t("PayСurrency") }}</span
                    >
                  </div>
                  <div class="placingOrder-info__trait">
                    <span class="placingOrder-info__name">{{ $t("Basket.discount") }}</span>
                    <span class="placingOrder-info__data placingOrder-info__data_discount"
                      >{{ -totalBasketProductsDiscount }} {{ $t("PayСurrency") }}</span
                    >
                  </div>
                </div>
              </template>
              <div class="noSelectedBasketProducts" v-else>
                <p class="noSelectedBasketProducts__p">
                  {{ $t("Basket.noSelectedBasketProducts", { count: 1 }) }}
                </p>
              </div>
            </div>
          </template>
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

  &__loader {
    width: 100%;
    height: 80%;

    @media (max-width: 500px) {
      height: 60%;
    }
  }

  &__h1 {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 23px;
    color: $black;
    margin: 25px 0;
  }

  &__wrap {
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 500px) {
      flex-wrap: wrap;
    }
  }
}
.basketproducts-list-wrap {
  background: $graySkeleton100;
  border-radius: 28px;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 70%;
  height: fit-content;
  gap: 20px;

  @media (max-width: 500px) {
    width: 100%;
  }
}

.basketproducts-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.Basket-panel {
  display: flex;
  padding-left: 30px;
  gap: 10px;

  &__button {
    background: none;
    cursor: pointer;
    outline: none;
    border: none;
    @include adaptiv-font(16, 14);
    font-weight: 500;
  }

  &__toggleSelected,
  &__clearSelected {
    color: $blue100;
  }

  &__clear {
    color: $red100;
  }

  @media (max-width: 500px) {
    padding-left: 0;
  }
}

.placingOrder {
  width: 30%;

  &__link {
    background: $lime70;
    display: inline-block;
    border-radius: 12px;
    @include adaptiv-font(18, 16);
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
    padding: 20px;
    width: 100%;
    color: $white;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
}
.placingOrder-info {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__trait {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    font-family: 500;
    @include adaptiv-font(18, 16);

    &_head {
      font-weight: 700;
      @include adaptiv-font(20, 18);
    }
  }

  &__data {
    font-weight: 600;
    &_price {
      color: $lime60;
    }

    &_discount {
      color: $red100;
    }
  }
}

.noSelectedBasketProducts {
  &__p {
    margin-top: 40px;
    font-weight: 800;
    @include adaptiv-font(20, 18);
    text-align: center;
  }
}
</style>
