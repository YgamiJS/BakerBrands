<script setup lang="ts">
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import ButtonForm from "./UI/ButtonForm.vue";
import InputForm from "./UI/InputForm.vue";

interface LogInForm {
  email: string;
  password: string;
}

const emit = defineEmits<{
  (e: "submit", data: LogInForm): void;
}>();

const { t } = useI18n();

const schema = yup.object({
  email: yup.string().required(t("LogIn.ThisEmailFieldRequired")),
  password: yup
    .string()
    .min(6, t("LogIn.minLengthLetters", { minLengthLetters: 6 }))
    .max(6, t("LogIn.maxLengthLetters", { maxLengthLetters: 16 }))
    .required(t("LogIn.ThisPasswordFieldRequired")),
  passwordConfirm: yup
    .string()
    .min(6, t("LogIn.minLengthLetters", { minLengthLetters: 6 }))
    .max(16, t("LogIn.maxLengthLetters", { maxLengthLetters: 16 }))
    .oneOf([yup.ref("password")])
    .required()
});

const { errors, handleSubmit, meta } = useForm<LogInForm>({
  validationSchema: schema
});

const onSubmit = handleSubmit((data) => {
  emit("submit", { email: data.email, password: data.password });
});
</script>

<template>
  <form class="login-form" @submit.prevent="onSubmit">
    <InputForm
      type="email"
      :placeholder="$t('LogIn.email')"
      class-name="login-form__email"
      name="email"
    />
    <p class="login-form__errorMessage" v-if="errors.email">{{ errors.email }}</p>
    <InputForm
      type="password"
      :placeholder="$t('LogIn.password')"
      class-name="login-form__password"
      name="password"
      max="16"
      min="6"
    />
    <p class="login-form__errorMessage" v-if="errors.password">{{ errors.password }}</p>
    <InputForm
      type="password"
      :placeholder="$t('LogIn.newPasswordConfirm')"
      class-name="login-form__password"
      name="passwordConfirm"
      max="16"
      min="6"
    />
    <p class="login-form__errorMessage" v-if="errors.password">{{ errors.password }}</p>
    <ButtonForm class="login-form__button" type="submit" :disabled="!meta.valid">
      {{ $t("LogIn.logIn") }}
    </ButtonForm>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.login-form {
  max-width: 400px;
  width: 100%;

  :deep(.login-form__email) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 20px;
  }

  :deep(.login-form__password) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 18px;
  }

  :deep(.login-form__button) {
    padding: 12px;
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