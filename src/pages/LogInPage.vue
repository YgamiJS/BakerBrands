<script setup lang="ts">
import type { ILogInForm } from "@/types";

import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import LogInForm from "@/components/LogInForm.vue";
import { LogInFirebase } from "@/composables";
import { Routes } from "@/types";
import { ref } from "vue";
import { useRouter } from "vue-router";

const isLogIn = ref<boolean>(false);
const isError = ref<boolean>(false);

const router = useRouter();

const onSubmit = (data: ILogInForm) => {
  LogInFirebase(data)
    .then(() => (isLogIn.value = !isLogIn.value))
    .then(() => router.push({ path: Routes.HOME }))
    .catch((error) => {
      if (error.message) isError.value = !isError.value;
    });
};
</script>

<template>
  <main class="LogIn">
    <div class="options">
      <Location />
      <GoBackButton />
    </div>
    <section class="LogIn-form">
      <div class="LogIn-form__container container">
        <h1 class="LogIn-form__h1">{{ $t("LogIn.logIn") }}</h1>
        <LogInForm @submit="onSubmit" />
        <div class="Registered" v-if="isLogIn">
          <h1 class="Registered__h1">{{ $t("LogIn.Registered.complitedRegistered") }}!</h1>
          <p class="Registered__p">
            {{ $t("LogIn.Registered.complitedRegisteredDescription.first") }}!
            {{ $t("LogIn.Registered.complitedRegisteredDescription.second") }}!
          </p>
        </div>
        <h1 class="LogIn-form__h1 LogIn__something-went-wrong" v-if="isError">
          {{ $t("LogIn.somethingWentWrong") }}
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
.LogIn {
  flex: 1 0 auto;
  min-height: 90vh;

  &__something-went-wrong {
    margin-top: 20px;
  }
}
.LogIn-form {
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

.Registered {
  text-align: center;
  &__h1 {
    color: $black;
    font-size: 26px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__p {
    color: $black;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
