<script setup lang="ts"></script>

<template>
  <li class="products-list__item">
    <RouterLink class="product-list__link" to="#">
      <div class="product-list__img"></div>
      <div class="product-list__favorite">
        <div class="product-list__favorite-img"></div>
      </div>
      <div class="product-list__info">
        <p class="product-list__name"></p>
        <div class="product-list__rating">
          <div class="product-list__star" v-for="n of 5" :key="n"></div>
        </div>
        <p class="product-list__price"></p>
        <div class="product-list__sizes">
          <p class="product-list__size" v-for="size of 4" :key="size"></p>
        </div>
      </div>
    </RouterLink>
  </li>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.product-list {
  scroll-snap-stop: always;

  &__link {
    display: flex;
    flex-direction: column;
    min-height: 400px;
    position: relative;
    gap: 5px;
    text-align: center;
    color: $black;
    animation: pulse-bg 300s infinite;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
  }

  &__img {
    animation: pulse-bg 500s infinite;
    height: 360px;
    width: 100%;
    margin-bottom: 10px;
  }

  &__favorite {
    animation: pulse-bg 1s infinite;
    background: $spacegrey;
    position: absolute;
    top: 0%;
    left: 100%;
    transform: translate(-100%, -0%);
    padding: 12.19px 13px 13.37px 12px;
    width: 40px;
    height: 40px;
    border-radius: 0px 0px 0px 20px;
  }

  &__name {
    animation: pulse-bg 1s infinite;
    border-radius: 28px;
    width: 100%;
    height: 19px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }

  &__price {
    animation: pulse-bg 1s infinite;
    align-self: center;
    border-radius: 28px;
    height: 19px;
    width: 40%;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
  }

  &__rating {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__star {
    animation: pulse-bg 1s infinite;
    width: 20px;
    height: 20px;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      79% 91%,
      50% 70%,
      21% 91%,
      32% 57%,
      2% 35%,
      39% 35%
    );
  }

  &__sizes {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  &__size {
    animation: pulse-bg 1s infinite;
    border-radius: 50%;
    width: 11px;
    height: 11px;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: $whiteGrey;
    text-transform: uppercase;
  }
}

@keyframes pulse-bg {
  0% {
    background: $graySkeleton;
  }

  50% {
    background: $graySkeletonLoading;
  }

  100% {
    background: $graySkeleton;
  }
}
</style>
