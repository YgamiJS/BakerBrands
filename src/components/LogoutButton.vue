<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button class="logout" @click="emit('click')">
    {{ $t("Profile.logout") }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.logout {
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

  &:hover {
    color: $lowspacegrey;
  }
}
</style>
