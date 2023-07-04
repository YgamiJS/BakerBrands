<script setup lang="ts">
defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button class="Product__load" @click="$emit('click')">
    {{ $t("Shop.loadMore") }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Product {
  &__load {
    background: $spacegray;
    cursor: pointer;
    border-radius: 28px;
    font-weight: 500;
    max-width: 256px;
    width: 100%;
    height: 55px;
    text-align: center;
    outline: none;
    border: none;
    color: $white;
  }
}
</style>
