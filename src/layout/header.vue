<script setup lang="ts">
import { images } from "@/assets/images";
import ChangeLocale from "@/components/ChangeLocale.vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isVisible = ref<boolean>(false);

const toggleMobileNav = () => {
  isVisible.value = !isVisible.value;
};
</script>
<template>
  <header class="header">
    <div class="header__container container">
      <div class="header__union">
        <img class="burger" @click="toggleMobileNav" :src="images.burgerMenu" alt="" />
        <nav class="header__nav">
          <ul class="menu">
            <li class="menu__item">
              <RouterLink class="menu__link" to="#">{{ $t("header.new") }}</RouterLink>
            </li>
            <li class="menu__item">
              <RouterLink class="menu__link" to="/Shop/">{{ $t("header.catalog") }}</RouterLink>
            </li>
            <li class="menu__item">
              <RouterLink class="menu__link" to="#">{{ $t("header.aboutUs") }}</RouterLink>
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
                <RouterLink class="menu__link" to="#">{{ $t("header.new") }}</RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link" to="/Shop/">{{ $t("header.catalog") }}</RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link" to="#">{{ $t("header.aboutUs") }}</RouterLink>
              </li>
            </ul>
            <ul class="menu">
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="#"
                  ><img
                    class="menu__icon"
                    :src="images.input"
                    :title="$t('header.search')"
                    :alt="$t('header.search')"
                /></RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="#"
                  ><img
                    class="menu__icon"
                    :src="images.heart"
                    :title="$t('header.favorites')"
                    :alt="$t('header.favorites')"
                /></RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="/UserProfile"
                  ><img
                    class="menu__icon"
                    :src="images.user"
                    :title="$t('header.profile')"
                    :alt="$t('header.profile')"
                /></RouterLink>
              </li>
              <li class="menu__item">
                <RouterLink class="menu__link-img" to="#"
                  ><img
                    class="menu__icon"
                    :src="images.shoppingCard"
                    :title="$t('header.shoppingCard')"
                    :alt="$t('header.shoppingCard')"
                /></RouterLink>
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
            <RouterLink class="menu__link-img" to="#"
              ><img
                class="menu__icon"
                :src="images.input"
                :title="$t('header.search')"
                :alt="$t('header.search')"
            /></RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="#"
              ><img
                class="menu__icon"
                :src="images.heart"
                :title="$t('header.favorites')"
                :alt="$t('header.favorites')"
            /></RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="/UserProfile"
              ><img
                class="menu__icon"
                :src="images.user"
                :title="$t('header.profile')"
                :alt="$t('header.profile')"
            /></RouterLink>
          </li>
          <li class="menu__item">
            <RouterLink class="menu__link-img" to="#"
              ><img
                class="menu__icon"
                :src="images.shoppingCard"
                :title="$t('header.shoppingCard')"
                :alt="$t('header.shoppingCard')"
            /></RouterLink>
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
  background: white;
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

    &__link {
      display: inline-block;
      font-weight: 500;
      line-height: 21.13px;
      font-size: 18px;
      padding: 10px 20px;
      color: $black;
      white-space: nowrap;
      transition: all 300ms ease;
      &:hover {
        background: $superspacegrey;
        color: $white;
      }
    }
    .menu__link-img {
      padding: 10px 20px;
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
