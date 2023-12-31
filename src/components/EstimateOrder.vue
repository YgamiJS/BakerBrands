<script setup lang="ts">
import type { IReviewOrder } from "@/types";

import { ref } from "vue";

import EstimateOrderRating from "./EstimateOrderRating.vue";

const emit = defineEmits<{
  (e: "addReviewOrder", review: IReviewOrder): void;
  (e: "toggleIsOpen"): void;
}>();

const isAppreciated = ref<boolean>(false);
const files = ref<File[]>([]);
const comment = ref<string>("");
const rating = ref<number>(1);

const addFile = (event: Event) => {
  const selectedFiles = (event.target as HTMLInputElement).files;

  if (!selectedFiles?.length) return;

  files.value.unshift(...selectedFiles);
};

const addReview = () => {
  if (!comment.value.trim() || !files.value.length) return;
  emit("addReviewOrder", { comment: comment.value, images: files.value, rating: rating.value });
  isAppreciated.value = true;
};

const setRating = (currentRating: number) => {
  rating.value = currentRating;
};

const url = URL;
</script>

<template>
  <div class="EstimateOrder" @click="emit('toggleIsOpen')">
    <div class="EstimateOrder__container">
      <div class="EstimateOrder__content">
        <div class="EstimateOrder__panel" @click.stop>
          <div class="cross">
            <div class="cross__wrap" @click="emit('toggleIsOpen')">
              <div class="cross__line"></div>
              <div class="cross__line"></div>
            </div>
          </div>
          <template v-if="!isAppreciated">
            <h2 class="EstimateOrder__h2">{{ $t("Bought.estimateOrder") }}</h2>
            <EstimateOrderRating
              class="EstimateOrder__rating"
              @setRating="setRating"
              :grade="1"
              :maxStars="5"
            />
            <div class="EstimateOrder__files">
              <label class="EstimateOrder__label" for="file">{{
                $t("Bought.estimateOrderPanel.selectImages")
              }}</label>
              <input
                class="EstimateOrder__inputfile"
                type="file"
                accept="image/*"
                id="file"
                @change="addFile"
              />
              <div class="EstimateOrder__list-files">
                <img
                  class="EstimateOrder__file-img"
                  v-for="file of files"
                  :key="file.name"
                  :src="url.createObjectURL(file)"
                />
              </div>
            </div>
            <textarea
              class="EstimateOrder__comment"
              required
              :placeholder="$t('Bought.estimateOrderPanel.comment')"
              v-model="comment"
              @click.stop
            ></textarea>
            <button class="EstimateOrder__button" @click="addReview">
              {{ $t("Bought.estimateOrder") }}
            </button>
          </template>
          <template v-else>
            <h2 class="EstimateOrder__h2 EstimateOrder__h2_center">
              {{ $t("Bought.estimateOrderPanel.gratitude") }}
            </h2>
            <button class="EstimateOrder__button" @click="emit('toggleIsOpen')">
              {{ $t("Bought.estimateOrderPanel.close") }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.EstimateOrder {
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
    justify-content: center;
    color: $white;
    width: 100%;
  }

  &__panel {
    background: $white;
    padding: 20px;
    display: flex;
    border-radius: 16px;
    gap: 10px;
    flex-direction: column;
    justify-content: flex-start;

    @media (max-width: 500px) {
      width: 90%;
    }
  }

  &__rating {
    display: inline-block;
  }

  &__h2 {
    @include adaptiv-font(48, 40);
    color: $black;
    margin-bottom: 30px;

    &_center {
      text-align: center;
    }
  }

  &__comment {
    font-family: sans-serif;
    max-width: 60vw;
    min-width: 50vw;
    min-height: 300px;
    max-height: 40vh;
    width: 100%;
    height: 100%;
    resize: none;
    border: 1px solid $grey;
    padding: 8px;
    outline: none;

    @media (max-width: 500px) {
      max-width: none;
    }
  }

  &__button {
    background: $graySkeleton;
    @include adaptiv-font(24, 20);
    border-radius: 16px;
    cursor: pointer;
    font-weight: 500;
    padding: 12px;
    outline: none;
    border: none;

    &:hover {
      background: $graySkeletonLoading;
    }
  }

  &__files {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  &__label {
    background: $gray;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    @include adaptiv-font(18, 17);
    font-weight: 500;
    border-radius: 12px;
    padding: 8px 10px;
    cursor: pointer;
    color: $black;
  }

  &__inputfile {
    display: none;
  }

  &__list-files {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
  }

  &__file-img {
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
}

.cross {
  display: flex;
  width: 100%;
  justify-content: flex-end;

  &__wrap {
    position: relative;
    width: 35px;
    height: 35px;

    &:hover {
      .cross__line {
        background: $grey;
        transition: all 150ms ease;
      }
    }
  }

  &__line {
    background: $black;
    position: absolute;
    left: 50%;
    border-radius: 3px;
    width: 4px;
    height: 100%;

    &:first-child {
      transform: rotate(45deg);
    }

    &:last-child {
      transform: rotate(-45deg);
    }
  }
}
</style>
