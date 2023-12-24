<script setup lang="ts">
const props = defineProps<{
  description: string;
  img?: string;
  title: string;
}>();
</script>

<template>
  <div class="empty">
    <h2 class="empty__nofavoriteProducts">{{ props.title }}</h2>
    <p class="empty__description">{{ props.description }}</p>
    <img class="empty__notFound" :src="props?.img" :alt="$t('Favorites.empty')" v-if="props?.img" />
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.empty {
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 15%;
  width: 100%;
  height: 65%;

  &__nofavoriteProducts {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 45px;
    color: $black;
  }

  &__description {
    font-weight: 400;
    @include adaptiv-font(18, 14);
    line-height: 45px;
    color: $black;
  }

  &__notFound {
    align-self: center;
    width: 50px;
    height: 50px;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 0;
  }
}
</style>
