<script setup lang="ts">
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import ButtonForm from "./UI/ButtonForm.vue";
import InputForm from "./UI/InputForm.vue";

interface SingInForm {
  email: string;
  password: string;
}

const emit = defineEmits<{
  (e: "manyRetry"): void;
  (e: "submit", data: SingInForm): void;
}>();

const { t } = useI18n();

const maxRetry = 3;

const schema = yup.object({
  email: yup.string().email().required(t("SingIn.ThisEmailFieldRequired")),
  password: yup
    .string()
    .min(6, t("SingIn.minLengthLetters", { minLengthLetters: 6 }))
    .max(16, t("SingIn.maxLengthLetters", { maxLengthLetters: 16 }))
    .required(t("SingIn.ThisPasswordFieldRequired"))
});

const { errors, handleSubmit, meta, submitCount } = useForm<SingInForm>({
  validationSchema: schema
});

const onSubmit = handleSubmit((data) => {
  submitCount.value > maxRetry ? emit("manyRetry") : emit("submit", data);
});
</script>

<template>
  <form class="singin-form" @submit.prevent="onSubmit">
    <InputForm
      type="email"
      :placeholder="$t('SingIn.email')"
      class-name="singin-form__email"
      name="email"
    />
    <p class="singin-form__errorMessage" v-if="errors.email">{{ errors.email }}</p>
    <InputForm
      type="password"
      :placeholder="$t('SingIn.password')"
      class-name="singin-form__password"
      name="password"
      max="16"
      min="6"
    />
    <p class="singin-form__errorMessage" v-if="errors.password">{{ errors.password }}</p>
    <div class="singin-form__info">
      <RouterLink class="singin-form__p" to="/ForgetPassword"
        >{{ $t("SingIn.forgetPassword") }}?</RouterLink
      >
      <RouterLink class="singin-form__p" to="/LogIn">{{ $t("SingIn.noAccount") }}?</RouterLink>
    </div>
    <ButtonForm
      class-name="singin-form__button"
      :class="{ error: errors.email || errors.password }"
      type="submit"
      :disabled="!meta.valid"
    >
      {{ $t("SingIn.singIn") }}
    </ButtonForm>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.singin-form {
  max-width: 400px;
  width: 100%;

  :deep(.singin-form__email) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 20px;
  }

  :deep(.singin-form__password) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 18px;
  }

  :deep(.singin-form__button) {
    padding: 12px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 19px;
  }

  &__p {
    color: $black;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
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
