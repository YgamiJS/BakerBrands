<script setup lang="ts">
import type { ISingInForm } from "@/types";

import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import SingInForm from "@/components/SingInForm.vue";
import { SingInFirebase } from "@/composables";
import { Routes } from "@/types";
import { useStorage } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const bannedTime = useStorage<Date | null>("bannedTimeSingIn", null);
const currentTime = new Date();
const router = useRouter();
const manyRetried = ref<boolean>(false);
const isError = ref<boolean>(false);

const onSubmit = (data: ISingInForm) => {
  SingInFirebase(data)
    .then(() => router.push({ name: Routes.HOME }))
    .catch((error) => {
      console.log(error.message);
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
  <main class="SingIn">
    <div class="options">
      <Location />
      <GoBackButton />
    </div>
    <section class="SingIn-form">
      <div class="SingIn-form__container container">
        <h1 class="SingIn-form__h1">{{ $t("SingIn.singIn") }}</h1>
        <template v-if="!manyRetried">
          <SingInForm @submit="onSubmit" @many-retry="manyRetry" />
          <h1 class="SingIn-form__h1 SingIn__something-went-wrong" v-if="isError">
            {{ $t("SingIn.somethingWentWrong") }}
          </h1>
        </template>
        <h2 class="SingIn__tooManyTry" v-else>{{ $t("SingIn.manyRetry") }}</h2>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.options {
  @extend .container;
}
.SingIn {
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
.SingIn-form {
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
