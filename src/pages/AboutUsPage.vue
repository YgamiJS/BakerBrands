<script setup lang="ts">
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
</script>

<template>
  <main class="AboutUs">
    <section class="About">
      <div class="About__container container">
        <Location />
        <GoBackButton />
        <h1 class="About__h1">{{ $t("AboutUs.title") }}</h1>
        <div class="About__wrap">
          <p class="About__p">{{ $t("AboutUs.text.page1") }}</p>
          <p class="About__p">{{ $t("AboutUs.text.page2") }}</p>
          <p class="About__p">{{ $t("AboutUs.text.page3") }}</p>
          <p class="About__p">{{ $t("AboutUs.text.page4") }}</p>
          <p class="About__p">{{ $t("AboutUs.text.page5") }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.AboutUs {
  flex: 1 0 auto;
  min-height: 90vh;
}

.About {
  &__container {
    display: flex;
    flex-direction: column;
  }

  &__h1 {
    text-align: center;
    @include adaptiv-font(28, 24);
    font-weight: 900;
    margin: 20px 0;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 800px;
    align-self: center;
  }

  &__p {
    @include adaptiv-font(20, 18);
    font-weight: 500;
    text-align: justify;

    @media (max-width: 500px) {
      text-align: initial;
    }
  }
}
</style>
