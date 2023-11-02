<script setup lang="ts">
import TrashIcon from "@/assets/icons/TrashIcon.vue";
</script>

<template>
  <div class="trash">
    <TrashIcon class="trash__img" />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

@media (min-width: 760px) {
  .trash:hover > :deep(.trash__img path) {
    fill: $lowspacegrey;
  }
}

@media (max-width: 760px) {
  .trash:active > :deep(.trash__img path) {
    fill: $lowspacegrey;
  }
}

.trash {
  background: $graySkeletonLoading;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  padding: 12px;
  border-radius: 14px;
  cursor: pointer;
}
</style>
