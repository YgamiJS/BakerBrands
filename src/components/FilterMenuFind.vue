<script setup lang="ts">
import { debounce } from "@/utils";
import { useForm } from "vee-validate";
import * as yup from "yup";

import InputForm from "./UI/InputForm.vue";

interface IFind {
  findfield: string;
}

const emit = defineEmits<{
  (e: "submit", data: IFind): void;
}>();

const schema = yup.object({
  findfield: yup.string()
});

const { errors, handleSubmit } = useForm<IFind>({
  validationSchema: schema
});

const onSubmit = handleSubmit((data) => {
  emit(
    "submit",
    data.findfield
      ? data
      : ({
          findfield: matchMedia("(max-width: 950px)").matches
            ? (document.querySelectorAll(".find__findfield")[1] as HTMLInputElement).value
            : (document.querySelectorAll(".find__findfield")[0] as HTMLInputElement).value
        } as IFind)
  );
});

const debouncedSubmit = debounce(onSubmit, 300);
</script>

<template>
  <form class="find" @submit.prevent="onSubmit" :class="$attrs.className">
    <p class="find__search">{{ $t("Shop.Aside.Find.find") }}</p>
    <InputForm
      class-name="find__findfield"
      name="findfield"
      type="text"
      :placeholder="$t('Shop.Aside.Find.findAnyWay')"
      @input="debouncedSubmit"
      @change="debouncedSubmit"
    />
    <p class="find__errorMessage" v-if="errors.findfield">{{ errors.findfield }}</p>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.find {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__search {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: $black;
  }

  &__findfield {
    padding: 6px 15px;
    outline: none;
  }

  &__errorMessage {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }
}
</style>
