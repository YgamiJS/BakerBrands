<script setup lang="ts">
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import ButtonSearch from "./UI/ButtonSearch.vue";
import InputForm from "./UI/InputForm.vue";

interface ISearch {
  query: string;
}

const emit = defineEmits<{
  (e: "submit", query: ISearch): void;
}>();

const { t } = useI18n();

const schema = yup.object({
  query: yup
    .string()
    .min(3, t("Search.minLengthLetters", { minLengthLetters: 3 }))
    .max(32, t("Search.maxLengthLetters", { maxLengthLetters: 32 }))
    .required(t("Search.ThisSearchFieldRequired"))
});

const { errors, handleSubmit, meta } = useForm<ISearch>({ validationSchema: schema });

const onSubmit = handleSubmit((data) => {
  emit("submit", data);
});
</script>

<template>
  <form class="search-form" @submit="onSubmit">
    <InputForm
      class-name="search-form__input"
      name="query"
      type="text"
      :placeholder="errors.query ? $t('Search.ThisSearchFieldRequired') : $t('Search.findAnyWay')"
      min="3"
      max="32"
    />
    <ButtonSearch class-name="search-form__button" type="submit" :disabled="!meta.valid">
      <SearchIcon />
    </ButtonSearch>
  </form>
</template>

<style scoped lang="scss">
.search-form {
  max-width: 680px;
  position: relative;
  margin: 0 auto;

  &__input {
  }

  &__button {
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
  }
}
</style>
