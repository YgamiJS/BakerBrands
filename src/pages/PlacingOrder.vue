<script setup lang="ts">
import { images } from "@/assets/images";
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import PlacingOrderForm from "@/components/PlacingOrderForm.vue";
import { useBasketStore } from "@/store/basket";
import { useOrdersStore } from "@/store/bought";
import { usePlacingOrderStore } from "@/store/placingorder";
import { type IDeliveryMethod, Routes } from "@/types";
import { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { basketProducts } = storeToRefs(useBasketStore());
const { currentPlacingOrder } = storeToRefs(usePlacingOrderStore());
const { addBoughtProducts } = useOrdersStore();

const currentDeviveryMethod = ref<deliveryOrganizations>(deliveryOrganizations.RUSSIANPOST);

const onSubmit = () => {
  addBoughtProducts(currentDeviveryMethod.value, basketProducts.value);
  router.push({ name: Routes.COMPLETED_ORDER });
};

const setDeliveryMethod = (name: deliveryOrganizations) => (currentDeviveryMethod.value = name);

const deliveryMethods: IDeliveryMethod[] = [
  {
    id: "1",
    img: images.russianpost,
    name: deliveryOrganizations.RUSSIANPOST
  },
  {
    id: "2",
    img: images.cdek,
    name: deliveryOrganizations.CDEK
  }
];

onBeforeMount(() => {
  !currentPlacingOrder.value?.sum && router.replace("/");
});
</script>

<template>
  <main class="PlacingOrder">
    <div class="Order">
      <div class="Order__container container">
        <Location />
        <GoBackButton />
        <div class="Order__wrap-form">
          <h1 class="Order__h1">{{ $t("PlacingOrder.payment") }}</h1>
          <PlacingOrderForm
            class="Order__form"
            @submit="onSubmit"
            @set-delivery-method="setDeliveryMethod"
            :current-devivery-method="currentDeviveryMethod"
            :sum="currentPlacingOrder?.sum || 0"
            :delivery-methods="deliveryMethods"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.PlacingOrder {
  flex: 1 0 auto;
  min-height: 85vh;
}
.Order {
  height: 100%;

  &__container {
    height: 100%;

    @media (max-height: 800px) {
      height: 85%;
    }
  }

  &__h1 {
    @include adaptiv-font(40, 32);
    margin-bottom: 30px;
  }

  &__wrap-form {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  &__form {
  }
}
</style>
