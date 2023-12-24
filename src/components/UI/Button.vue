<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.button {
  background: $spacegray;
  cursor: pointer;
  color: $white;
  font-weight: 500;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  padding: 5px 10px;
  border-radius: 8px;
  outline: 0;
  border: 0;
  transition: all 150ms ease;

  &:hover {
    background: $whiteSmoke;
    color: $black;
  }

  &.error {
    color: $gray;
  }
}
</style>
