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
    padding: 5px;
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
    border-radius: 28px;
    height: 19px;
    width: 100%;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
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
