<script setup lang="ts">
import { useRoutes } from "@/composables";

const { routes } = useRoutes();
</script>

<template>
  <p class="location">
    <span class="location__link">{{ $t("Routes.Home") }}</span>
    <span class="location__link" v-for="route of routes" :key="route">{{
      $t(`Routes.${route}`)
    }}</span>
  </p>
</template>

<style scoped lang="scss">
.location {
  padding: 5px 0;
  &__link:not(:last-child) {
    &::after {
      content: url("@/assets/images/arrowRightPath.svg");
      vertical-align: sub;
      padding: 0 8.75px 0 14.65px;
    }
  }
}
</style>
