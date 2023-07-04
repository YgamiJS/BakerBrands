<script setup lang="ts">
import SelectItem from "./SelectItem.vue";

const { options } = defineProps<{ options: string[] }>();
</script>

<template>
  <div class="wrapper">
    <select class="select">
      <SelectItem v-for="value of options" :key="value" :value="value" />
    </select>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.wrapper {
  &::after {
    content: url("@/assets/images/vector.png");
    margin-left: 9.5px;
  }
}
.select {
  background: transparent;
  height: 19px;
  outline: 0;
  border: 0;
  appearance: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: $black;
}
</style>
