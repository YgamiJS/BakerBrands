<script setup lang="ts">
import type { IProduct } from "@/types";

import { useProductsStore } from "@/store/products";
import { ref } from "vue";

import Categories from "./CategoriesList.vue";
import Select from "./Select.vue";

const props = defineProps<{
  onClick: (category?: IProduct["category"]) => void;
}>();

const isOpenFilterButton = ref<boolean>(false);
const { categories, sortBy } = useProductsStore();
</script>

<template>
  <aside class="Filter">
    <p class="Filter__selects-button">
      {{ $t("Shop.Aside.catalog") }}
    </p>
    <div class="Filter__filters">
      <p class="Filter__p">{{ $t("Shop.Aside.catalog") }}</p>
      <div class="Filter__selects">
        <Select :options="sortBy.firstSortBy"></Select>
        <Select :options="sortBy.secondSortBy"></Select>
      </div>
    </div>
    <div class="Filter__selects-filtres" @click="isOpenFilterButton = !isOpenFilterButton">
      <span class="Filter__selects-filters-span">{{ $t("Shop.Aside.filtres") }}</span>
    </div>
    <div class="allFiltres" :class="{ active: isOpenFilterButton }">
      <div class="allFiltres__selects">
        <Select :options="sortBy.firstSortBy"></Select>
        <Select :options="sortBy.secondSortBy"></Select>
      </div>
      <div class="allFiltres__categories">
        <Categories
          :categories="categories"
          :is-open-filter-button="isOpenFilterButton"
          @click="props.onClick"
        />
      </div>
    </div>
    <div class="Filter__categories">
      <div class="Filter__categories-list">
        <Categories
          :categories="categories"
          :is-open-filter-button="isOpenFilterButton"
          @click="onClick"
        />
      </div>
      <slot></slot>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Filter {
  display: flex;
  flex-direction: column;
  &__filters {
    display: flex;
    gap: 70px;
  }

  &__selects {
    display: flex;
    align-items: center;
    gap: 34.5px;
  }

  &__p {
    margin: 30px 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: $black;
  }

  &__categories {
    display: flex;
    gap: 20px;

    @media (max-width: 950px) {
      flex-wrap: wrap;
    }
  }

  &__selects-button {
    background: $spacegrey;
    margin-top: 18px;
    margin-bottom: 15px;
    padding: 5px 0;
    display: none;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    width: 100%;
    font-size: 26px;
    color: $white;
    &::after {
      content: url("@/assets/images/chevron-down.svg");
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
    }
  }

  &__filters.active {
    display: flex !important;
    padding: 10px 0;
  }

  &__selects-filtres {
    display: none;
    position: relative;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid $black;
    cursor: pointer;
    &::after {
      content: url("@/assets/images/chevron-down-black.svg");
      position: absolute;
      left: 100%;
      transform: translateX(-100%);
    }
  }

  &__selects-filters-span {
    display: flex;
    &::after {
      content: url("@/assets/images/filter.svg");
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin-left: 13px;
    }
  }

  .allFiltres {
    display: none;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;

    &.active {
      @media (max-width: 950px) {
        display: flex;
      }
    }

    &.active + .Filter__categories .Filter__categories-list {
      @media (max-width: 950px) {
        display: none;
      }
    }

    &__selects {
      display: flex;
      gap: 30px;
    }
  }

  @media (max-width: 950px) {
    &__selects-button {
      display: flex;
    }

    &__filters {
      display: none;
    }

    &__selects-filtres {
      display: flex;
    }

    &__p {
      display: none;
    }
  }
}
</style>
