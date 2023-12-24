<script setup lang="ts">
import { images } from "@/assets/images";
import { useCurrentOrderStore } from "@/store/currentOrder";
import { Routes } from "@/types";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();
const { currentOrder } = storeToRefs(useCurrentOrderStore());

onBeforeMount(() => {
  !currentOrder.value?.id && router.replace("/");
});
</script>

<template>
  <main class="CompletedOrder">
    <div class="order">
      <div class="order__container container">
        <h1 class="order__h1">
          {{ $t("ComplitedOrder.ordernumber", { orderid: currentOrder?.id }) }}
        </h1>
        <p class="order_startdate">
          {{
            $t("ComplitedOrder.orderstartdate", {
              day: new Date(currentOrder?.startDate || "").getDate(),
              month:
                new Date(currentOrder?.startDate || "")?.getMonth() &&
                new Date(currentOrder?.startDate || "")?.getMonth() + 1
            })
          }}
        </p>
        <div class="order__wrap-img">
          <img
            class="order__successfully"
            :src="images.success"
            :alt="$t('ComplitedOrder.successfullyorder')"
          />
        </div>
        <RouterLink class="order__link" :to="{ name: Routes.BOUGHTPAGE }">{{
          $t("ComplitedOrder.goToOrders")
        }}</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.CompletedOrder {
  flex: 1 0 auto;
  min-height: 85vh;
}
.order {
  height: 100vh;

  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;

    @media (max-height: 800px) {
      height: 85%;
    }
  }

  &_startdate {
    font-weight: 500;
  }

  &__h1 {
    text-align: left;
    font-weight: 900;
    @include adaptiv-font(40, 32);
  }

  &__wrap-img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80%;
  }

  &__successfully {
    max-width: 300px;
    max-height: 300px;
    width: 100%;
    height: 100%;
  }

  &__link {
    background: $black;
    align-self: center;
    display: inline-block;
    width: fit-content;
    border-radius: 12px;
    color: $white;
    padding: 10px;
    text-decoration: none;
    text-align: center;
    transition: ease all 300ms;

    &:hover {
      background: $gray;
      color: $black;
    }
  }
}
</style>
