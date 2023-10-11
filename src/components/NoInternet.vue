<script setup lang="ts">
import { images } from "@/assets/images";
</script>

<template>
  <div class="noInternet">
    <h1 class="noInternet__h1">{{ $t("NoInternet.noInternet") }}</h1>
    <img class="noInternet__img" :src="images.nowifi" :alt="$t('NoInternet.noInternet')" />
    <p class="noInternet__p">{{ $t("NoInternet.turnOnInternet") }}</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.noInternet {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
  min-height: 100vh;

  &__h1 {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 23px;
    color: $black;
  }

  &__img {
    width: 100px;
    height: 100px;
  }

  &__p {
    font-weight: 400;
    @include adaptiv-font(16, 14);
    line-height: 23px;
    color: $black;
  }
}
</style>
