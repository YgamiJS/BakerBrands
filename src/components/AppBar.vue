<script setup lang="ts">
import FavoriteIcon from "@/assets/icons/FavoriteIcon.vue";
import HomeIcon from "@/assets/icons/HomeIcon.vue";
import OrderIcon from "@/assets/icons/OrderIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import ShopIcon from "@/assets/icons/ShopIcon.vue";
import { useBasketStore } from "@/store/basket";
import { useOrdersStore } from "@/store/bought";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink } from "vue-router";

const { favoriteProducts } = storeToRefs(useFavoritesStore());
const { basketProducts } = storeToRefs(useBasketStore());
const { orderProducts } = storeToRefs(useOrdersStore());

const basketProductsCount = computed<number>(() =>
  basketProducts.value.reduce((a, b) => a + b.count, 0)
);
</script>

<template>
  <nav class="AppBar">
    <ul class="menu">
      <li class="menu__item">
        <RouterLink to="/Shop/" class="menu__link">
          <HomeIcon class="menu__icon" />
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink class="menu__link" to="/Search/">
          <SearchIcon class="menu__icon" />
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink to="/Favorites/" class="menu__link">
          <FavoriteIcon class="menu__icon" />
          <div v-if="favoriteProducts.length >= 1" class="menu__count">
            {{ favoriteProducts.length }}
          </div>
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink to="/Basket/" class="menu__link">
          <ShopIcon class="menu__icon" />
          <div v-if="basketProducts.length >= 1" class="menu__count">
            {{ basketProductsCount }}
          </div>
        </RouterLink>
      </li>
      <li class="menu__item">
        <RouterLink to="/Bought/" class="menu__link">
          <OrderIcon class="menu__icon" />
          <div v-if="orderProducts.length >= 1" class="menu__count">
            {{ orderProducts.length }}
          </div>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

:deep(.menu__link:hover .menu__icon path) {
  stroke: $lowspacegrey;
}

:deep(.menu__link.router-link-active .menu__icon path) {
  stroke: $lowspacegrey;
}

.AppBar {
  background: $graySkeleton;
  position: fixed;
  bottom: 0%;
  width: 100%;
  z-index: 7;
}
.menu {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  align-items: center;

  &__item {
    position: relative;
    width: 26px;
    height: 24px;
  }

  &__count {
    position: absolute;
    display: flex;
    align-items: center;
    font-family: sans-serif;
    font-size: 14px;
    justify-content: center;
    text-align: center;
    background: $red90;
    top: 20%;
    left: 100%;
    transform: translate(-20%, -100%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: $white;
    z-index: 2;
  }
}
</style>
