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
  color: $white;
  font-weight: 500;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  outline: 0;
  border: 0;
  width: 100%;
  color: $white;
  &.error {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
