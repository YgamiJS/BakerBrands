<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
</script>

<template>
  <main class="UserAcceptedPage">
    <section class="UserAccepted">
      <div class="UserAccepted__container container">
        <Location />
        <GoBackButton />
        <h1 class="UserAccepted__h1">{{ $t("UserAccepted.useraccepted") }}</h1>
        <div class="UserAccepted__content" v-html="$t('UserAccepted.content')"></div>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
@import "@/assets/scss/App.scss";

.UserAccepted {
  &__h1,
  h2 {
    font-weight: 400;
    @include adaptiv-font(32, 24);
    line-height: 23px;
    color: $black;
    margin: 25px 0;
  }

  &__content {
    h2 {
      @include adaptiv-font(30, 22);
      margin: 8px 0;
    }

    b {
      font-weight: 600;
    }
  }
}
</style>
