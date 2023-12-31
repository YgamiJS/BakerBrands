<script setup lang="ts">
import FavoriteIcon from "@/assets/icons/FavoriteIcon.vue";
import OrderIcon from "@/assets/icons/OrderIcon.vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import ShopIcon from "@/assets/icons/ShopIcon.vue";
import UserIcon from "@/assets/icons/UserIcon.vue";
import { images } from "@/assets/images";
import ChangeLocale from "@/components/ChangeLocale.vue";
import { useBasketStore } from "@/store/basket";
import { useOrdersStore } from "@/store/bought";
import { useFavoritesStore } from "@/store/favorites";
import { storeToRefs } from "pinia";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const isVisible = ref<boolean>(false);

const { favoriteProducts } = storeToRefs(useFavoritesStore());
const { basketProducts } = storeToRefs(useBasketStore());
const { orderProducts } = storeToRefs(useOrdersStore());

const toggleMobileNav = () => {
  isVisible.value = !isVisible.value;
};

const basketProductsCount = computed<number>(() =>
  basketProducts.value.reduce((a, b) => a + b.count, 0)
);
</script>
<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__union">
        <img class="burger" @click="toggleMobileNav" :src="images.burgerMenu" alt="" />
        <nav class="header__nav">
          <ul class="menu">
            <li class="menu__item">
              <RouterLink class="menu__link" to="/ShopNew/">{{ $t("header.new") }}</RouterLink>
            </li>
            <li class="menu__item">
              <RouterLink class="menu__link" to="/Shop/">{{ $t("header.catalog") }}</RouterLink>
            </li>
            <li class="menu__item">
              <RouterLink class="menu__link" to="/AboutUs/">{{ $t("header.aboutUs") }}</RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <RouterLink class="logo" to="/">BAKERBRANDS</RouterLink>
      <div class="overlay mobile-nav" :class="isVisible && 'active'" @click="toggleMobileNav">
        <div class="overlay__container">
          <nav class="overlay__nav">
            <ul class="menu">
              <li class="menu__item">
                <RouterLink class="menu__link" to="/ShopNew/">{{ $t("header.new") }}</RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link" to="/Shop/">{{ $t("header.catalog") }}</RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link" to="/AboutUs/">{{
                  $t("header.aboutUs")
                }}</RouterLink>
              </li>
            </ul>
            <ul class="menu">
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="/Search/" :description="$t('header.search')">
                  <SearchIcon class="menu__icon" />
                </RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="/Bought/" :description="$t('header.bought')">
                  <OrderIcon class="menu__icon" />
                  <div v-if="orderProducts.length >= 1" class="menu__count">
                    {{ orderProducts.length }}
                  </div>
                </RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink
                  class="menu__link-img"
                  to="/Favorites/"
                  :description="$t('header.favorites')"
                >
                  <FavoriteIcon class="menu__icon" />
                  <div v-if="favoriteProducts.length >= 1" class="menu__count">
                    {{ favoriteProducts.length }}
                  </div>
                </RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink
                  class="menu__link-img"
                  to="/Profile"
                  :description="$t('header.profile')"
                >
                  <UserIcon class="menu__icon" />
                </RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="/Basket/" :description="$t('header.basket')">
                  <ShopIcon class="menu__icon" />
                  <div v-if="basketProducts.length >= 1" class="menu__count">
                    {{ basketProductsCount }}
                  </div>
                </RouterLink>
              </li>
              <li class="menu__item-locale">
                <ChangeLocale />
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <nav class="header__nav">
        <ul class="menu">
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="/Search/" :description="$t('header.search')">
              <SearchIcon class="menu__icon" />
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="/Bought/" :description="$t('header.bought')">
              <OrderIcon class="menu__icon" />
              <div v-if="orderProducts.length >= 1" class="menu__count">
                {{ orderProducts.length }}
              </div>
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink
              class="menu__link-img"
              to="/Favorites/"
              :description="$t('header.favorites')"
            >
              <FavoriteIcon class="menu__icon" />
              <div v-if="favoriteProducts.length >= 1" class="menu__count">
                {{ favoriteProducts.length }}
              </div>
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="/Profile" :description="$t('header.profile')">
              <UserIcon class="menu__icon" />
            </RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="/Basket/" :description="$t('header.basket')">
              <ShopIcon class="menu__icon" />
              <div v-if="basketProducts.length >= 1" class="menu__count">
                {{ basketProductsCount }}
              </div>
            </RouterLink>
          </li>
          <li class="menu__item-locale">
            <ChangeLocale />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.overlay {
  display: none;
  z-index: 9;
  background: $white;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50px;
  left: 0px;
  &__nav {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 5px;
    &__item-locale {
      padding: 0 0 0 15px;
    }
  }
}

.overlay.active {
  display: block;
}
.header {
  width: 100%;
  padding: 10px 0;
  position: fixed;
  z-index: 5;
  background: $white;
  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  @media (min-width: 950px) {
    .burger {
      display: none;
    }
  }

  &__union {
    display: flex;
    gap: 79.03px;
  }

  @media (max-width: 950px) {
    .logo {
      width: 100%;
      text-align: center;
    }
    &__nav {
      display: none;
    }
  }
  .menu {
    display: flex;
    gap: 26.27px;

    &__item {
      position: relative;
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
      top: 30%;
      left: 100%;
      transform: translate(-30%, -100%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      color: $white;
      z-index: 2;

      @media (max-width: 880px) {
        left: 90%;
        transform: translate(-30%, -90%);
      }
    }

    &__link {
      display: inline-block;
      font-weight: 500;
      line-height: 21.13px;
      font-size: 18px;
      padding: 10px 20px;
      color: $black;
      white-space: nowrap;
      transition: all 300ms ease;

      &.router-link-active,
      &:hover {
        background: $superspacegrey;
        color: $white;
      }
    }

    @media (min-width: 950px) {
      align-items: center;
    }

    :deep(.menu__link-img:hover .menu__icon path) {
      stroke: $lowspacegrey;
    }

    :deep(.menu__link-img.router-link-active .menu__icon path) {
      stroke: $lowspacegrey;
    }

    .menu__link-img {
      position: relative;
      padding: 10px 5px;

      @media (max-width: 950px) {
        padding: 10px 20px;
      }

      &:hover::after {
        content: attr(description);
        border-radius: 8px;
        z-index: 3;
        background: $black;
        padding: 5px 10px;
        position: absolute;
        color: $white;
      }
    }
  }
  .logo {
    font-weight: 700;
    font-size: 26px;
    line-height: 30.52px;
    color: $black;
  }
}
</style>
