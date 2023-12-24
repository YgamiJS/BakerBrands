<script setup lang="ts">
import { Routes } from "@/types";
</script>

<template>
  <ul class="links">
    <li class="links__item">
      <RouterLink class="links__link" :to="{ name: Routes.FAVORITES }">{{
        $t("Profile.myFavoritesProducts")
      }}</RouterLink>
    </li>
    <li class="links__item">
      <RouterLink class="links__link" :to="{ name: Routes.BASKET }">{{
        $t("Profile.myBasketProducts")
      }}</RouterLink>
    </li>
    <li class="links__item">
      <RouterLink class="links__link" :to="{ name: Routes.BOUGHTPAGE }">{{
        $t("Profile.myBougthProducts")
      }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.links {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__link {
    display: inline-block;
    background: $spacegray;
    cursor: pointer;
    color: $white;
    font-weight: 500;
    font-size: 18px;
    font-style: normal;
    line-height: normal;
    padding: 5px 10px;
    border-radius: 8px;
    text-decoration: none;

    &:hover {
      color: $lowspacegrey;
    }
  }
}
</style>
