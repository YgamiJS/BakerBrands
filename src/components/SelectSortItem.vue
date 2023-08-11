<script setup lang="ts">
const props = defineProps<{ value: string }>();
</script>
<template>
  <option class="option" :value="props.value">{{ $t(`Shop.Aside.Select.${props.value}`) }}</option>
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
