<script setup lang="ts"></script>

<template>
  <input type="checkbox" class="selectInput" />
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.checkbox {
  background-color: $gray;
  border-radius: 3px;
  appearance: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: all 300ms ease;

  &::after {
    content: "\2713";
    color: $green;
    display: none;
  }

  &:hover {
    background: $lime60;
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
