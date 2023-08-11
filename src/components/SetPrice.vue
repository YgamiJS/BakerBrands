<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

import ButtonForm from "./UI/ButtonForm.vue";
import InputForm from "./UI/InputForm.vue";

interface ISetPrice {
  maxPrice: number;
  minPrice: number;
}

interface Props extends ISetPrice {
  className?: string;
}

const emit = defineEmits<{
  (e: "submit", data: ISetPrice): void;
}>();

const props = defineProps<Props>();

const schema = yup.object({
  maxPrice: yup.number().transform((value) => (isNaN(value) ? 0 : value)),
  minPrice: yup.number().transform((value) => (isNaN(value) ? 0 : value))
});

const { errors, handleSubmit, meta } = useForm<ISetPrice>({
  validationSchema: schema
});

const validateKey = (key: string) => {
  return (
    (key >= "0" && key <= "9") ||
    key == "ArrowLeft" ||
    key == "ArrowRight" ||
    key == "Delete" ||
    key == "Backspace"
  );
};

const onSubmit = handleSubmit((data) => {
  emit("submit", data);
});
</script>

<template>
  <form class="setPrice" @submit.prevent="onSubmit" :class="props.className">
    <p class="setPrice__price">{{ $t("Shop.Aside.SetPrice.price") }}</p>
    <InputForm
      type="number"
      name="minPrice"
      :onkeydown="(event: KeyboardEvent) => validateKey(event.key)"
      class-name="setPrice__input setPrice__input-min"
      :placeholder="$t('Shop.Aside.SetPrice.minPrice', { minPrice: props.minPrice })"
      :min="props.minPrice"
    />
    <p class="setPrice__errorMessage" v-if="errors.minPrice">{{ errors.minPrice }}</p>
    <InputForm
      type="number"
      name="maxPrice"
      :onkeydown="(event: KeyboardEvent) => validateKey(event.key)"
      class-name="setPrice__input setPrice__input-max"
      :placeholder="$t('Shop.Aside.SetPrice.maxPrice', { maxPrice: props.maxPrice })"
      :max="props.maxPrice"
    />
    <p class="setPrice__errorMessage" v-if="errors.maxPrice">{{ errors.maxPrice }}</p>
    <ButtonForm class="setPrice__button" type="submit" :disabled="!meta.valid">
      {{ $t("Shop.Aside.SetPrice.pickup") }}
    </ButtonForm>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.setPrice {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__price {
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: $black;
  }

  &__p {
    margin: 30px 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: $black;
  }

  &__input {
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

  &__button {
    padding: 5px 10px;
    transition: 300ms all ease;
    &:hover {
      color: $gray;
    }
  }
}
</style>
