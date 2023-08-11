<script setup lang="ts">
import type { ICategory, IFind, ISetPrice, SortBy } from "@/types";

import { useProductsStore } from "@/store/products";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import Categories from "./CategoriesList.vue";
import FilterMenuFind from "./FilterMenuFind.vue";
import Select from "./SelectSort.vue";
import SetPrice from "./SetPrice.vue";

const props = defineProps<{
  onClick: (category?: ICategory) => void;
  onSelect: (filter: SortBy) => void;
  onSubmit: (data: IFind) => void;
  onSubmitSetPrice: (data: ISetPrice) => void;
}>();

const isOpenFilterButton = ref<boolean>(false);
const { categories, sortBy } = useProductsStore();

const { maxPriceByCategory, minPriceByCategory } = storeToRefs(useProductsStore());
</script>

<template>
  <aside class="Filter">
    <p class="Filter__selects-button">
      {{ $t("Shop.Aside.catalog") }}
    </p>
    <div class="Filter__filters">
      <p class="Filter__p">{{ $t("Shop.Aside.catalog") }}</p>
      <div class="Filter__selects">
        <Select @select="props.onSelect" :options="sortBy.firstSortBy"></Select>
        <Select @select="props.onSelect" :options="sortBy.secondSortBy"></Select>
      </div>
    </div>
    <div class="Filter__selects-filtres" @click="isOpenFilterButton = !isOpenFilterButton">
      <span class="Filter__selects-filters-span">{{ $t("Shop.Aside.filtres") }}</span>
    </div>
    <div class="allFiltres" :class="{ active: isOpenFilterButton }">
      <div class="allFiltres__selects">
        <Select @select="props.onSelect" :options="sortBy.firstSortBy"></Select>
        <Select @select="props.onSelect" :options="sortBy.secondSortBy"></Select>
      </div>
      <div class="allFiltres__categories">
        <FilterMenuFind class-name="allFiltres__find" @submit="props.onSubmit" />
        <SetPrice
          @submit="props.onSubmitSetPrice"
          class-name="allFiltres__setPrice"
          :max-price="maxPriceByCategory"
          v-if="isOpenFilterButton"
          :min-price="minPriceByCategory"
        />
        <Categories
          :categories="categories"
          :is-open-filter-button="isOpenFilterButton"
          @click="props.onClick"
        />
      </div>
    </div>
    <div class="Filter__categories">
      <div class="Filter__categories-list">
        <FilterMenuFind
          class-name="allFiltres__find allFiltres__find_pc"
          @submit="props.onSubmit"
        />
        <SetPrice
          @submit="props.onSubmitSetPrice"
          class-name="allFiltres__setPrice allFiltres__setPrice_pc"
          :max-price="maxPriceByCategory"
          :min-price="minPriceByCategory"
        />
        <Categories
          :categories="categories"
          :is-open-filter-button="isOpenFilterButton"
          @click="props.onClick"
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

    &-list {
      display: flex;
      flex-direction: column;
      gap: 10px;

      @media (max-width: 950px) {
        display: none;
      }
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

    &__find {
      &_pc {
        @media (max-width: 950px) {
          display: none;
        }
      }
    }

    &__categories {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

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

    &__find {
      max-width: 200px;
      width: 100%;

      @media (max-width: 950px) {
        max-width: 100%;
      }
    }

    &__setPrice {
      max-width: 200px;
      width: 100%;

      @media (max-width: 950px) {
        max-width: 100%;
      }

      &_pc {
        @media (max-width: 950px) {
          display: none;
        }
      }
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
