<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div class="loader__spinner"></div>
    <p class="loader__p">{{ $t("Loader.loading") }}...</p>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &__spinner {
    animation: loader infinite linear 700ms;
    border: 3px dotted $spacegrey;
    border-radius: 50%;
    width: 250px;
    height: 250px;
  }

  &__p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: $black;
    text-align: center;
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
    border-color: $grey;
  }
}
</style>
