<script setup lang="ts">
import ShareIcon from "@/assets/icons/ShareIcon.vue";
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    files?: File[];
    text: string;
    title: string;
    url: string;
  }>(),
  {
    files: () => []
  }
);

const isSupported = computed<boolean>(() => !!navigator.share);
const isCopy = ref<boolean>(false);

const share = async () => {
  if (isSupported.value) {
    await navigator.share(props);
  } else {
    isCopy.value = true;
    navigator.clipboard.writeText(props.url);
  }
};
</script>

<template>
  <button class="ShareButton" @click="share">
    <ShareIcon class="ShareButton__img" />
    {{ !isCopy ? $t("ShareButton.ShareButton") : $t("ShareButton.CopiedLink") }}
  </button>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.ShareButton {
  background: none;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 5px 5px 5px 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 100ms all ease;

  &:active {
    fill: $lowspacegrey;
  }

  @media (min-width: 767px) {
    &:hover &__img {
      fill: $lowspacegrey;
    }
  }

  &__img {
    width: 24px;
    height: 24px;
  }
}
</style>
