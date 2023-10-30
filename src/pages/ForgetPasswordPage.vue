<script setup lang="ts">
import ForgetPasswordForm from "@/components/ForgetPasswordForm.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import { ForgetPasswordFirebase } from "@/composables";
import { useStorage } from "@vueuse/core";
import { onMounted, ref } from "vue";

interface IForgetPasswordForm {
  email: string;
  password: string;
}

const bannedTime = useStorage<Date | null>("bannedTimeRestorePassword", null);
const currentTime = new Date();
const isSend = ref<boolean>(false);
const manyRetried = ref<boolean>(false);
const isError = ref<boolean>(false);

const onSubmit = (data: IForgetPasswordForm) => {
  ForgetPasswordFirebase(data.email)
    .then(() => (isSend.value = !isSend.value))
    .catch((error) => {
      if (error.message) isError.value = !isError.value;
    });
};

const manyRetry = () => {
  manyRetried.value = true;
  bannedTime.value = new Date(currentTime.getTime() + 60 * 60 * 1000);
};

onMounted(() => {
  if (bannedTime == null) return;

  if (currentTime > new Date(bannedTime.value!)) {
    manyRetried.value = false;
    bannedTime.value = null;
  } else {
    manyRetried.value = true;
  }
});
</script>

<template>
  <main class="ForgetPasswordPage">
    <div class="options">
      <Location />
      <GoBackButton />
    </div>
    <section class="ForgetPasswordPage-form">
      <div class="ForgetPasswordPage-form__container container">
        <template v-if="!(isSend && manyRetried)">
          <h1 class="ForgetPasswordPage-form__h1">{{ $t("ForgetPasswordForm.singIn") }}</h1>
          <ForgetPasswordForm @submit="onSubmit" @many-retry="manyRetry" />
        </template>
        <h2 class="ForgerPasswordPage__tooManyTry" v-else-if="manyRetried">
          {{ $t("ForgetPasswordForm.manyRetry") }}
        </h2>
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

.options {
  @extend .container;
}
.ForgetPasswordPage {
  flex: 1 0 auto;
  min-height: 90vh;

  &__something-went-wrong {
    margin-top: 20px;
  }

  &__tooManyTry {
    color: $black;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 31px;
    text-align: center;
  }
}
.ForgetPasswordPage-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  height: 100%;

  @media (max-width: 767px) {
    margin-top: 20%;
  }
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
