<script setup lang="ts">
import type { IBasketProductData, IProduct } from "@/types";

import FavoriteButton from "@/components/UI/FavoriteButton.vue";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink } from "vue-router";

import CounterBasketProduct from "./CounterBasketProduct.vue";
import SelectInput from "./UI/SelectInput.vue";
import TrashButton from "./UI/TrashButton.vue";

const props = defineProps<{
  basketProduct: IBasketProductData;
  selectedProducts: IProduct["id"][];
}>();

const emit = defineEmits<{
  (e: "addFavoriteProduct", id: IProduct["id"]): void;
  (e: "addOrRemoveSelectedBasketProduct", id: IProduct["id"]): void;
  (e: "addSelectedBasketProduct", id: IProduct["id"]): void;
  (e: "decrement"): void;
  (e: "increment"): void;
  (e: "removeBasketProduct", id: IProduct["id"]): void;
  (e: "removeBasketProductSize", basketProductId: IProduct["id"], currentSize: string): void;
  (e: "removeFavoriteProduct", id: IProduct["id"]): void;
}>();

const { favoriteProducts } = storeToRefs(useFavoritesStore());

const isLike = computed(
  () =>
    !!favoriteProducts.value.find((favoriteProduct) => favoriteProduct.id == props.basketProduct.id)
      ?.id
);

const isSelected = computed<boolean>(() => props.selectedProducts.includes(props.basketProduct.id));

const addOrRemoveToFavoriteProducts = async (productId: IProduct["id"]) => {
  !isLike.value
    ? await emit("addFavoriteProduct", productId)
    : await emit("removeFavoriteProduct", productId);
};

emit("addSelectedBasketProduct", props.basketProduct.id);
</script>

<template>
  <li class="basketproducts-list__item">
    <SelectInput
      class="basketproducts-list__selectInput"
      @click="emit('addOrRemoveSelectedBasketProduct', props.basketProduct.id)"
      :checked="isSelected"
    />
    <RouterLink
      class="basketproducts-list__link"
      :class="{ 'basketproducts-list__link_unselected': isSelected }"
      :to="`/Shop/${props.basketProduct.id}`"
    >
      <div class="basketproducts-list__wrap basketproducts-list__wrap-selectInput">
        <SelectInput
          class="basketproducts-list__selectInput basketproducts-list__selectInput_mob"
          @click.prevent="emit('addOrRemoveSelectedBasketProduct', props.basketProduct.id)"
          @touchend.prevent="emit('addOrRemoveSelectedBasketProduct', props.basketProduct.id)"
          :checked="isSelected"
        />
      </div>
      <img class="basketproducts-list__img" :src="props.basketProduct.img" />
      <div class="basketproducts-list__wrap basketproducts-list__names">
        <p class="basketproducts-list__name">{{ props.basketProduct.name }}</p>
        <p class="basketproducts-list__description">{{ props.basketProduct.description }}</p>
      </div>
      <div class="basketproducts-list__wrap">
        <p class="basketproducts-list__sizes">{{ $t("Basket.sizes") }}</p>
        <ul class="basketproducts-list__selectedSizes">
          <li
            class="basketproducts-list__itemSize"
            v-for="size of props.basketProduct.sizes"
            @click.prevent="emit('removeBasketProductSize', props.basketProduct.id, size)"
            :key="size"
          >
            <div class="cross">
              <div class="cross__line"></div>
              <div class="cross__line"></div>
            </div>
            <span class="basketproducts-list__selectedSize">{{ size }}</span>
          </li>
        </ul>
      </div>
      <CounterBasketProduct
        class="basketproducts-list__counter"
        :basket-product-id="props.basketProduct.id"
        @increment="emit('increment')"
        @decrement="emit('decrement')"
      />
      <div
        class="basketproducts-list__wrap basketproducts-list__prices basketproducts-list__prices_mob"
      >
        <p class="basketproducts-list__price">
          {{ props.basketProduct.price }} {{ $t("PayСurrency") }}
        </p>
        <del class="basketproducts-list__oldprice"
          >{{ props.basketProduct.oldprice }} {{ $t("PayСurrency") }}</del
        >
      </div>
      <div class="basketproducts-list__wrap basketproducts-list__control">
        <FavoriteButton
          @click.prevent="addOrRemoveToFavoriteProducts(props.basketProduct.id)"
          :class="{ favorite__inFavorite: isLike }"
        />
        <TrashButton @click.prevent="emit('removeBasketProduct', props.basketProduct.id)" />
        <CounterBasketProduct
          class="basketproducts-list__counter_mob basketproducts-list__counter_mob"
          :basket-product-id="props.basketProduct.id"
          @increment="emit('increment')"
          @decrement="emit('decrement')"
        />
      </div>
      <div class="basketproducts-list__wrap basketproducts-list__prices">
        <p class="basketproducts-list__price">
          {{ props.basketProduct.price }} {{ $t("PayСurrency") }}
        </p>
        <del class="basketproducts-list__oldprice"
          >{{ props.basketProduct.oldprice }} {{ $t("PayСurrency") }}</del
        >
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.basketproducts-list {
  &__item {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 5px;
  }

  &__link {
    background: $graySkeleton100;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
    cursor: pointer;
    border-radius: 12px;
    color: $black;
    gap: 20px;

    &_unselected {
      background: $graySkeleton;
    }

    @media (max-width: 500px) {
      padding: 15px;
    }
  }

  &__img {
    animation: pulse-bg 1s infinite;
    width: 100px;
    height: 100px;
  }

  &__description {
    word-break: break-all;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__names {
    align-self: flex-start;
    padding-top: 10px;

    @media (max-width: 500px) {
      padding: 10px 10px 0 0;
    }
  }

  &__name {
    font-weight: 800;
    font-size: 20px;
  }

  &__sizes {
    font-weight: 600;
  }

  &__selectedSizes {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-weight: 500;
    text-align: center;
  }

  &__itemSize {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  &__selectedSize {
    display: inline-block;
    width: min-content;
    cursor: pointer;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 500;
    padding: 5px 10px;
    background: $black;
    color: $white;
  }

  &__control {
    display: flex;
    gap: 5px;
  }

  &__price {
    background: $red90;
    border-radius: 5px;
    color: $white;
    padding: 4px;
    font-size: 16px;
    font-weight: 600;
  }

  &__prices {
    &_mob {
      display: none;
    }

    @media (max-width: 380px) {
      display: none;

      &_mob {
        display: block;
      }
    }
  }

  &__selectInput {
    &_mob {
      display: none;
    }

    @media (max-width: 500px) {
      display: none;

      &_mob {
        display: block;
      }
    }
  }

  &__wrap-selectInput {
    height: 100%;

    @media (min-width: 500px) {
      display: none;
    }
  }

  &__counter {
    &_mob {
      display: none;
    }

    @media (max-width: 380px) {
      display: none;

      &_mob {
        display: block;
      }
    }
  }
}

.cross {
  width: 15px;
  height: 15px;
  position: relative;

  &__line {
    background: $black;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 3px;
    border-radius: 3px;

    &:first-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &:last-child {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
}

@keyframes pulse-bg {
  0% {
    background: $graySkeleton;
  }

  50% {
    background: $graySkeletonLoading;
  }

  100% {
    background: $graySkeleton;
  }
}
</style>
