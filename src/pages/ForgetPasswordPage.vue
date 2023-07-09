<script setup lang="ts">
import ForgetPasswordForm from "@/components/ForgetPasswordForm.vue";
import { ForgetPasswordFirebase } from "@/composables";
import { ref } from "vue";

interface IForgetPasswordForm {
  email: string;
  password: string;
}

const isSend = ref<boolean>(false);
const isError = ref<boolean>(false);

const onSubmit = (data: IForgetPasswordForm) => {
  ForgetPasswordFirebase(data.email)
    .then(() => (isSend.value = !isSend.value))
    .catch((error) => {
      if (error.message) isError.value = !isError.value;
    });
};
</script>

<template>
  <main class="ForgetPasswordPage">
    <section class="ForgetPasswordPage-form">
      <div class="ForgetPasswordPage-form__container container">
        <template v-if="!isSend">
          <h1 class="ForgetPasswordPage-form__h1">{{ $t("ForgetPasswordForm.singIn") }}</h1>
          <ForgetPasswordForm @submit="onSubmit" />
        </template>
        <div class="ForgetPasswordPage__code" v-else>
          <h1 class="ForgetPasswordPage__h1">{{ $t("ForgetPasswordForm.sendConfirm") }}</h1>
        </div>
        <h1
          class="ForgetPasswordPage-form__h1 ForgetPasswordPage__something-went-wrong"
          v-if="isError"
        >
          {{ $t("ForgetPasswordForm.somethingWentWrong") }}
        </h1>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.ForgetPasswordPage {
  scroll-snap-stop: always;
  flex: 1 0 auto;
  &__something-went-wrong {
    margin-top: 20px;
  }
}
.ForgetPasswordPage-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  &__h1 {
    color: $black;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 31px;
    text-align: center;
  }
}
</style>
