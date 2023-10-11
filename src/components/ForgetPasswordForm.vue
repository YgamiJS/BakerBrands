<script setup lang="ts">
import { useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import * as yup from "yup";

import ButtonForm from "./UI/ButtonForm.vue";
import InputForm from "./UI/InputForm.vue";

interface ForgetPasswordForm {
  email: string;
  password: string;
}

const emit = defineEmits<{
  (e: "manyRetry"): void;
  (e: "submit", data: ForgetPasswordForm): void;
}>();

const { t } = useI18n();

const maxRetry = 3;

const schema = yup.object({
  email: yup
    .string()
    .email(t("ForgetPasswordForm.noValidEmail"))
    .required(t("ForgetPasswordForm.ThisEmailFieldRequired")),
  password: yup
    .string()
    .min(6, t("ForgetPasswordForm.minLengthLetters", { minLengthLetters: 6 }))
    .max(6, t("ForgetPasswordForm.maxLengthLetters", { maxLengthLetters: 16 }))
    .required(t("ForgetPasswordForm.ThisPasswordFieldRequired")),
  passwordConfirm: yup
    .string()
    .min(6, t("ForgetPasswordForm.minLengthLetters", { minLengthLetters: 6 }))
    .max(16, t("ForgetPasswordForm.maxLengthLetters", { maxLengthLetters: 16 }))
    .oneOf([yup.ref("password")])
    .required()
});

const { errors, handleSubmit, meta, submitCount } = useForm<ForgetPasswordForm>({
  validationSchema: schema
});

const onSubmit = handleSubmit((data) => {
  submitCount.value > maxRetry ? emit("manyRetry") : emit("submit", data);
});
</script>

<template>
  <form class="ForgetPasswordForm-form" @submit.prevent="onSubmit">
    <InputForm
      type="email"
      :placeholder="$t('ForgetPasswordForm.email')"
      class-name="ForgetPasswordForm-form__email"
      name="email"
    />
    <p class="ForgetPasswordForm-form__errorMessage" v-if="errors.email">{{ errors.email }}</p>
    <InputForm
      type="password"
      :placeholder="$t('ForgetPasswordForm.newPassword')"
      class="ForgetPasswordForm-form__password"
      name="password"
    />
    <p class="ForgetPasswordForm-form__errorMessage" v-if="errors.password">
      {{ errors.password }}
    </p>
    <InputForm
      type="password"
      :placeholder="$t('ForgetPasswordForm.newPasswordConfirm')"
      class-name="ForgetPasswordForm-form__password"
      name="passwordConfirm"
      max="16"
      min="6"
    />
    <p class="ForgetPasswordForm-form__errorMessage" v-if="errors.password">
      {{ errors.password }}
    </p>
    <ButtonForm
      class-name="ForgetPasswordForm-form__button"
      :class="{ error: errors.email || errors.password }"
      type="submit"
      :disabled="!meta.valid"
    >
      {{ $t("ForgetPasswordForm.continue") }}
    </ButtonForm>
  </form>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.ForgetPasswordForm-form {
  max-width: 400px;
  width: 100%;

  &__errorMessage {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 20px;
  }

  :deep(.ForgetPasswordForm-form__email) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 20px;
  }

  :deep(.ForgetPasswordForm-form__password) {
    padding: 17px 30px 14px 30px;
    margin-bottom: 18px;
  }

  :deep(.ForgetPasswordForm-form__button) {
    padding: 12px;
  }
}
</style>
