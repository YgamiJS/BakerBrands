<script setup lang="ts">
import { images } from "@/assets/images";
import { RouterLink } from "vue-router";
</script>

<template>
  <main class="Home">
    <section class="Preview">
      <div class="Preview__text">
        <h1 class="Preview__h1">BAKERBRANDS</h1>
        <RouterLink class="Preview__p" to="/Shop">{{
          $t("Home.Preview.watchТovelties")
        }}</RouterLink>
      </div>
      <img class="Preview__img" :src="images.leftPhoto" :alt="$t('Home.Preview.boyAndGirl')" />
      <img class="Preview__img" :src="images.centerPhoto" :alt="$t('Home.Preview.boy')" />
      <img class="Preview__img" :src="images.rightPhoto" :alt="$t('Home.Preview.boy')" />
    </section>
    <section class="Categories">
      <div class="Categories__container container">
        <h2 class="Categories__h2">{{ $t("Home.Categories.categories") }}</h2>
        <ul class="categories-list">
          <li class="categories-list__item">
            <RouterLink to="/Shop">
              <img class="categories-list__img" :src="images.capHuman" alt="Boy" />
              <div class="categories-list__category">{{ $t("Home.Categories.tshirts") }}</div>
            </RouterLink>
          </li>
          <li class="categories-list__item">
            <RouterLink to="/Shop">
              <img class="categories-list__img" :src="images.hotHuman" alt="Boy" />
              <div class="categories-list__category">{{ $t("Home.Categories.hoodies") }}</div>
            </RouterLink>
          </li>
          <li class="categories-list__item">
            <RouterLink to="/Shop">
              <img class="categories-list__img" :src="images.asianHuman" alt="Boy" />
              <div class="categories-list__category">{{ $t("Home.Categories.trousers") }}</div>
            </RouterLink>
          </li>
          <li class="categories-list__item">
            <RouterLink to="/Shop">
              <img class="categories-list__img" :src="images.hatHuman" alt="Boy" />
              <div class="categories-list__category">{{ $t("Home.Categories.hats") }}</div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
    <section class="subscride">
      <div class="subscride__container container">
        <h2 class="subscride__h2">{{ $t("Home.Subscride.knowTovelties") }}</h2>
        <a class="subscride__telegram" href="#">{{
          $t("Home.Subscride.SubscrideTelegramChannel")
        }}</a>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.Home {
  scroll-snap-stop: always;
}
.Preview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;

  &__text {
    z-index: 4;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__h1 {
    font-weight: 600;
    font-size: 42px;
    line-height: 49px;
    color: $white;
    &::after {
      content: "";
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 0.94px;
      border-bottom: 0.94px solid $white;
    }
  }

  &__p {
    font-weight: 600;
    font-size: 16px;
    line-height: 49px;
    color: $white;
    position: relative;
    transition: all 300ms ease;
    &::before {
      content: "";
      background: url("@/assets/images/arrowRight.svg");
      position: absolute;
      top: 50%;
      left: 110%;
      transform: translate(-110%, -50%);
      display: flex;
      width: 8px;
      height: 10px;
      transition: all 300ms ease;
    }
    &:hover::before {
      top: 50%;
      left: 115%;
      transform: translate(-115%, -50%);
    }
  }

  &__img {
    width: 100%;
    height: calc(100svh - 50px);
    z-index: 2;
  }

  @media (max-width: 767px) {
    grid-template-columns: 0 1fr 0;
  }
}

.Categories {
  margin: 100px 0;

  &__h2 {
    font-weight: 400;
    font-size: 36px;
    line-height: 42px;
    color: $black;
    padding-bottom: 50px;
  }
}
.categories-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;

  &__item {
    position: relative;
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__category {
    background: $graey;
    color: $white;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -100%);
  }
}

.subscride {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__h2 {
    font-weight: 400;
    font-size: 36px;
    line-height: 42px;
    text-align: center;
    color: $black;
    margin-bottom: 50px;
  }

  &__telegram {
    background: $gray;
    align-self: center;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: $black;
    max-width: 600px;
    padding: 25px;
    width: 100%;
  }
}
</style>
