<script setup lang="ts">
import type { IFind, IProduct } from "@/types";

import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { images } from "@/assets/images";
import { debounce } from "@/utils";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import SearchResultsList from "./SearchResultsList.vue";
import ButtonSearch from "./UI/ButtonSearch.vue";
import InputForm from "./UI/InputForm.vue";

const emit = defineEmits<{
  (e: "search", q: IFind): void;
  (e: "submit", query: IFind): void;
}>();

const props = defineProps<{
  isLoading: boolean;
  results: IProduct[];
}>();

const isSearch = ref<boolean>(false);

const { t } = useI18n();

const schema = yup.object({
  findfield: yup
    .string()
    .min(3, t("Search.minLengthLetters", { minLengthLetters: 3 }))
    .max(32, t("Search.maxLengthLetters", { maxLengthLetters: 32 }))
    .required(t("Search.ThisSearchFieldRequired"))
});

const { errors, handleSubmit, meta } = useForm<IFind>({ validationSchema: schema });

const onSubmit = handleSubmit((data) => {
  emit("submit", data);
});

const onSearch = handleSubmit((data) => {
  emit("search", data);
  isSearch.value = true;
});

const debouncedSearch = debounce(onSearch, 300);
</script>

<template>
  <form class="search-form" :class="$attrs.className" @submit="onSubmit" autocomplete="off">
    <div class="search-form__form">
      <InputForm
        class-name="search-form__input"
        :class="{ search: isSearch }"
        name="findfield"
        type="text"
        :placeholder="errors.findfield ? $t('Search.ThisSearchFieldRequired') : $t('Search.query')"
        @input="debouncedSearch"
        min="3"
        max="32"
      />
      <ButtonSearch
        class-name="search-form__button"
        :class="{ error: errors.findfield }"
        type="submit"
        :disabled="!meta.valid"
      >
        <SearchIcon />
      </ButtonSearch>
    </div>
    <SearchResultsList :results="props.results" v-if="props.results.length > 0" />
    <div class="loading" v-else-if="props.isLoading">
      <img class="loading__loader" :src="images.loading" :alt="$t('Search.loading')" />
      <p class="loading__p">{{ $t("Search.loading") }}</p>
    </div>
    <div class="noResults" v-else-if="props.results.length < 1 && isSearch">
      <img class="noResults__img" :src="images.noResults" :alt="$t('Search.noResults')" />
      <p class="noResults__p">{{ $t("Search.noResults") }}</p>
    </div>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.search-form {
  max-width: 680px;
  width: 100%;
  position: relative;
  margin: 0 auto;

  &__form {
    position: relative;
  }

  &__input {
    width: 100%;
    padding: 18px 58px 18px 28px;
    border-radius: 28px;
    outline: none;

    &.search {
      border-radius: 28px 28px 0 0;
    }
  }

  &__button {
    position: absolute;
    left: 99%;
    transform: translate(-99%, -50%);
    top: 50%;
    border-radius: 28px;
    width: 45px;
    height: 45px;

    @media (max-width: 475px) {
      left: 98%;
      transform: translate(-98%, -50%);
      top: 50%;
    }
  }

  :deep(.search-form__button path) {
    stroke: $white;
  }
}

.noResults {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px 18px;
  color: $whiteGrey;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid $black;
  width: 100%;
  border-radius: 0 0 28px 28px;

  &__img {
    width: 50px;
    height: 50px;
  }
}

.loading {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 16px 18px;
  color: $whiteGrey;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  border: 1px solid $black;
  width: 100%;
  border-radius: 0 0 28px 28px;

  &__loader {
    animation: loading 1s ease infinite;
    width: 50px;
    height: 50px;
  }
}

@keyframes loading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
