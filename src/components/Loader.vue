<script setup lang="ts"></script>

<template>
  <div class="loader">
    <p class="loader__p">{{ $t("Loader.loading") }}...</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid $spacegrey;
  width: 250px;
  height: 250px;
  &__p {
    color: $black;
    text-align: center;
  }
}
</style>
