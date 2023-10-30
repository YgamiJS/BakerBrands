<script setup lang="ts">
import type { IProduct } from "@/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps<{
  currentProduct: IProduct;
  handleTouchEnd?: () => void;
  handleTouchStart?: (event: TouchEvent) => void;
  navigation: boolean;
}>();
</script>

<template>
  <swiper
    class="mob-swiper"
    :class="$attrs.class"
    :loop="true"
    :navigation="props.navigation"
    :pagination="true"
    :modules="[Pagination, Navigation]"
  >
    <swiper-slide
      class="mob-swiper__slide"
      v-for="img of props.currentProduct?.images
        ? [props.currentProduct?.img, ...props.currentProduct?.images]
        : []"
      :key="img"
    >
      <img
        class="mob-swiper__img"
        :src="img"
        :fetchpriority="
          (props.currentProduct?.images
            ? [props.currentProduct?.img, ...props.currentProduct?.images]
            : []
          ).indexOf(img) == 0 && 'high'
        "
        loading="lazy"
        @touchstart="props?.handleTouchStart"
        @touchend="props?.handleTouchEnd"
      />
    </swiper-slide>
  </swiper>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.mob-swiper {
  display: none;

  &__img {
    background: $graySkeleton;
    object-fit: fill;
    width: 100%;
    height: 420px;
  }

  :deep(.swiper-pagination-bullet) {
    background: $black;
    opacity: 0.6;
  }
  :deep(.swiper-pagination-bullet-active) {
    background: $white;
  }

  :deep(.swiper-button-next) {
    background: $superspacegrey;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  :deep(.swiper-button-prev) {
    background: $superspacegrey;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }

  :deep(.swiper-button-next::after) {
    content: "";
    background: url("@/assets/images/arrowSwiper.svg") no-repeat center center;
    width: 20px;
    height: 20px;
  }

  :deep(.swiper-button-prev::after) {
    content: "";
    background: url("@/assets/images/arrowSwiper.svg") no-repeat center center;
    transform: rotate(-180deg);
    width: 20px;
    height: 20px;
  }
}
</style>
