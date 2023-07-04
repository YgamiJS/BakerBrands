<script setup lang="ts">
const { value } = defineProps<{ value: string }>();
</script>
<template>
  <option class="option" :value="value">{{ $t(`Shop.Aside.Select.${value}`) }}</option>
</template>
<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.option {
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: $black;
}
</style>
