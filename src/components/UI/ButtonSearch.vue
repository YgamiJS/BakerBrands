<script setup lang="ts">
const props = defineProps<{
  className?: string;
  disabled?: boolean;
  type: "button" | "reset" | "submit";
}>();
</script>

<template>
  <button class="button" :class="props.className" :type="props.type" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/varibles.scss";

.button {
  background: $spacegray;
  cursor: pointer;
  outline: 0;
  border: 0;
  &.error {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
