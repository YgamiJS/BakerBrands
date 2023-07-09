<script setup lang="ts">
import SingInForm from "@/components/SingInForm.vue";
import { SingInFirebase } from "@/composables";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface ISingInForm {
  email: string;
  password: string;
}

const router = useRouter();

const isError = ref<boolean>(false);

const onSubmit = (data: ISingInForm) => {
  SingInFirebase(data)
    .then(() => router.push({ path: "/" }))
    .catch((error) => {
      if (error.message) isError.value = !isError.value;
    });
};
</script>

<template>
  <main class="SingIn">
    <section class="SingIn-form">
      <div class="SingIn-form__container container">
        <h1 class="SingIn-form__h1">{{ $t("SingIn.singIn") }}</h1>
        <SingInForm @submit="onSubmit" />
        <h1 class="SingIn-form__h1 SingIn__something-went-wrong" v-if="isError">
          {{ $t("SingIn.somethingWentWrong") }}
        </h1>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.SingIn {
  scroll-snap-stop: always;
  flex: 1 0 auto;
  &__something-went-wrong {
    margin-top: 20px;
  }
}
.SingIn-form {
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
