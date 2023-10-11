<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();
</script>

<template>
  <div class="error">
    <h2 class="error__error">
      {{ props.text }}
    </h2>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.error {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 20%;
  width: 100%;
  height: 100%;

  &__error {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 45px;
    color: $black;
  }
}
</style>
