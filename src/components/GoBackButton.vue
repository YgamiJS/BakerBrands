<script setup lang="ts">
import { images } from "@/assets/images";
import { count } from "@/router";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => router.back();
</script>

<template>
  <div class="GoBack" @click="goBack" v-if="count >= 1">
    <img class="GoBack__img-arrow" :src="images.arrowRightPath" :alt="$t('GoBack.goBack')" />
    {{ $t("GoBack.goBack") }}
  </div>
</template>

<style scoped lang="scss">
.GoBack {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 10px 10px 0;
  cursor: pointer;

  &__img-arrow {
    transform: rotate(-180deg);
  }
}
</style>
