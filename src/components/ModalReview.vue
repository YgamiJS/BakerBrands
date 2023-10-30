<script setup lang="ts">
import type { IReview, IUser } from "@/types";

import { images } from "@/assets/images";
import { useUserStore } from "@/store/user";
import { onMounted, onUnmounted, ref } from "vue";

const dataReview = ref<IUser>({ avatar: "", id: "", name: "", surname: "" });
const { getUserData } = useUserStore();

const props = defineProps<{
  comment: string;
  length: number;
  rating: number;
  reviewerid: IReview["reviewerid"];
  reviewimg: string;
  reviewIndex: number;
}>();

const emit = defineEmits<{
  (e: "slideNextReview"): void;
  (e: "slidePrevReview"): void;
  (e: "toggleIsOpen"): void;
}>();

const keyboardCheck = (event: KeyboardEvent) => {
  if (event.keyCode == 37) {
    emit("slidePrevReview");
  } else if (event.keyCode == 39) {
    emit("slideNextReview");
  }
};

onMounted(async () => {
  dataReview.value = ((await getUserData(props.reviewerid)) as IUser) || dataReview.value;

  document.addEventListener("keydown", keyboardCheck);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keyboardCheck);
});
</script>

<template>
  <div class="ModalReview" @click="emit('toggleIsOpen')">
    <div class="ModalReview__container">
      <div class="ModalReview__content">
        <div
          class="ModalReview__prev"
          :class="{ ModalReview__prev_hidden: !props.reviewIndex }"
          @click.stop="emit('slidePrevReview')"
        >
          <img
            class="ModalReview__arrow-img ModalReview__arrow-img_prev"
            :src="images.arrowSwiperReview"
          />
        </div>
        <div class="ModalReview-modal" @click.stop>
          <img class="ModalReview__img" :src="props.reviewimg" />
          <div class="reviewer">
            <div class="reviewer__wrap">
              <div class="reviewer__inner">
                <img class="reviewer__img" :src="dataReview.avatar" :alt="dataReview.name" />
                <div class="reviewer__data">
                  <span class="reviewer__name">{{ dataReview.name }} {{ dataReview.surname }}</span>
                  <span class="reviewer__rating"
                    ><span class="reviewer__star"></span>{{ props.rating }} / 5</span
                  >
                </div>
              </div>
              <p class="reviewer__comment">
                {{ props.comment }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="ModalReview__next"
          :class="{ ModalReview__next_hidden: props.reviewIndex + 1 == props.length }"
          @click.stop="emit('slideNextReview')"
        >
          <img
            class="ModalReview__arrow-img ModalReview__arrow-img_next"
            :src="images.arrowSwiperReview"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.ModalReview {
  cursor: pointer;

  &__container {
    background: $blacktransparent;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0%;
    left: 0%;
    position: fixed;
    z-index: 101;
    width: 100vw;
    height: 100vh;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 1080px) {
      gap: 8px;
    }
  }

  &__prev {
    width: 11px;
    padding: 10px;
  }

  &__arrow-img {
    width: 11px;
    height: 19px;

    &_prev {
      transform: rotate(-180deg);
    }
  }

  &__img {
    border-radius: 18px;
    min-width: 60%;
    height: 60vh;

    @media (max-width: 1080px) {
      width: 100%;
      height: 40vh;
    }

    @media (max-width: 500px) {
      width: 100%;
      height: 30vh;
    }
  }

  &__next {
    padding: 10px;
  }

  &__next,
  &__prev {
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    &_hidden {
      visibility: hidden;
    }
  }
}
.ModalReview-modal {
  background: $white;
  padding: 20px;
  display: flex;
  gap: 20px;
  border-radius: 20px;
  width: 60vw;

  @media (max-width: 1080px) {
    flex-wrap: wrap;
    width: 65vw;
  }
}
.reviewer {
  &__inner {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__data {
    display: flex;
    flex-direction: column;
    width: auto;
    margin-top: 5px;
  }

  &__img {
    background: $grey;
    align-self: flex-start;
    border-radius: 50%;
    width: 50px;
    height: 50px;

    &::before,
    &::after {
      content: "";
    }
  }

  &__name {
    font-weight: 900;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: sans-serif;
  }

  &__comment {
    margin-top: 20px;
    word-break: break-all;

    &::first-letter {
      text-transform: uppercase;
    }
  }

  &__star {
    background: $yellow;
    display: inline-block;
    width: 20px;
    height: 20px;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }
}
</style>
