<script setup lang="ts">
const props = defineProps<{
  checked: boolean;
}>();
</script>

<template>
  <input type="checkbox" :checked="props.checked" class="selectInput" />
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.selectInput {
  background-color: $gray;
  border-radius: 50%;
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 300ms ease;
  flex-grow: 0;
  box-sizing: content-box;
  border: 3px solid $black;

  &::after {
    content: "\2713";
    color: $blue100;
    font-size: 14px;
    display: none;
  }

  &:hover {
    background: $whiteGrey;
  }

  &:checked {
    background-color: $graySkeleton;
    color: $white;
  }

  &:checked::after {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
