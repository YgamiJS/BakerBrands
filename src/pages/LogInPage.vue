<script setup lang="ts">
import LogInForm from "@/components/LogInForm.vue";
import { LogInFirebase } from "@/composables";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface ILogInForm {
  email: string;
  password: string;
}

const isLogIn = ref<boolean>(false);
const isError = ref<boolean>(false);

const router = useRouter();

const onSubmit = (data: ILogInForm) => {
  LogInFirebase(data)
    .then(() => (isLogIn.value = !isLogIn.value))
    .then(() => router.push({ path: "/" }))
    .catch((error) => {
      if (error.message) isError.value = !isError.value;
    });
};
</script>

<template>
  <main class="LogIn">
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
.LogIn {
  scroll-snap-stop: always;
  flex: 1 0 auto;
  &__something-went-wrong {
    margin-top: 20px;
  }
}
.LogIn-form {
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
