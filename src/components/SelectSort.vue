<script setup lang="ts">
import type { SortBy } from "@/types";

import SelectItem from "./SelectSortItem.vue";

const emit = defineEmits<{
  (e: "select", filter: SortBy): void;
}>();
const props = defineProps<{ options: string[] }>();

const change = async (event: Event) => {
  if ((event.target as HTMLSelectElement)?.value == "sortBy") return;
  emit("select", (event.target as HTMLSelectElement)?.value as SortBy);
};
</script>

<template>
  <div class="wrapper">
    <select class="select" @change="change">
      <option class="select__sortBy" selected value="sortBy">
        {{ $t("Shop.Aside.Select.sortBy") }}
      </option>
      <SelectItem v-for="value of props.options" :key="value" :value="value" />
    </select>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.wrapper {
  &::after {
    content: url("@/assets/images/Vector.png");
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
