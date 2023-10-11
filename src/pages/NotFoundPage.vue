<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="NotFound">
    <section class="NotFound-info">
      <div class="NotFound-info__container container">
        <h1 class="NotFound-info__h1">{{ $t("NotFound.pageNotFound") }}</h1>
        <p class="NotFound-info__p NotFound-info__p_code">404</p>
        <RouterLink class="NotFound-info__link" to="/">{{ $t("NotFound.goToHome") }}</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.NotFound {
  flex: 1 0 auto;
  min-height: 90vh;
}
.NotFound-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;

  &__h1 {
    color: $black;
    font-size: 32px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  &__p {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 32px;
  }

  &__p_code {
    font-size: 28px;
  }

  &__link {
    color: $black;
    text-decoration: underline;
  }
}
</style>
