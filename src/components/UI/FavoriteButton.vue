<script setup lang="ts">
import FavoriteIcon from "@/assets/icons/FavoriteIcon.vue";
</script>

<template>
  <div class="favorite">
    <FavoriteIcon class="favorite__img" />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

@media (min-width: 760px) {
  .favorite:hover > :deep(.favorite__img path) {
    stroke: $lowspacegrey;
  }
}

@media (max-width: 760px) {
  .favorite:active > :deep(.favorite__img path) {
    stroke: $lowspacegrey;
  }
}

.favorite__inFavorite > :deep(.favorite__img path) {
  stroke: $lowspacegrey;
}

.favorite {
  background: $graySkeletonLoading;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  padding: 12px;
  border-radius: 14px;
  cursor: pointer;
}
</style>
