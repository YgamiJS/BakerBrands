<script setup lang="ts">
import { images } from "@/assets/images";
import { count } from "@/router";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => router.back();
</script>

<template>
  <button class="GoBack" @click="goBack" v-if="count >= 1" translate="no">
    <img class="GoBack__img-arrow" :src="images.arrowRightPath" :alt="$t('GoBack.goBack')" />
    {{ $t("GoBack.goBack") }}
  </button>
</template>

<style scoped lang="scss">
.GoBack {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-family: "Raleway-Regular", sans-serif;
  font-size: 16px;
  gap: 5px;
  padding: 10px 10px 10px 0;
  cursor: pointer;

  &__img-arrow {
    transform: rotate(-180deg);
  }
}
</style>
