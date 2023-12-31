<script setup lang="ts">
import type { IDeliveryMethod, IOrder, IReviewOrder } from "@/types";

import { images } from "@/assets/images";
import BoughtOrderList from "@/components/BoughtOrderList.vue";
import EstimateOrder from "@/components/EstimateOrder.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import EmptyInfo from "@/components/UI/EmptyInfo.vue";
import ErrorInfo from "@/components/UI/ErrorInfo.vue";
import { useOrdersStore } from "@/store/bought";
import { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const {
  addReview,
  changeDevilieryStatus,
  fetchBoughtProducts,
  getBoughtProducts,
  removeBougthtProduct
} = useOrdersStore();
const { error, loading, orderProducts, orderProductsData } = storeToRefs(useOrdersStore());
const isOpen = ref<boolean>(false);

const currentOrder = ref<{ order: IOrder }>({
  order: {
    boughtProducts: [],
    deliveryOrganization: deliveryOrganizations.CDEK,
    id: "",
    startDate: "",
    status: 0,
    transferDate: ""
  }
});

const toggleIsOpen = () => (isOpen.value = !isOpen.value);

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

const estimateOrder = (id: string) => {
  currentOrder.value.order = orderProducts.value.find((orderProduct) => orderProduct.id === id)!;
  toggleIsOpen();
};

const addReviewOrder = async (review: IReviewOrder) => {
  currentOrder.value.order.boughtProducts.forEach(async (item) => {
    await addReview(review, item.id);
  });

  await removeBougthtProduct(currentOrder.value.order.id);
};

onMounted(async () => {
  await fetchBoughtProducts();
  await getBoughtProducts();
  await changeDevilieryStatus();
});
</script>

<template>
  <main class="BoughtPage">
    <section class="Bought">
      <div class="Bought__container container">
        <Location />
        <GoBackButton />
        <div class="Bought__wrap-order">
          <h1 class="Bought__h1">{{ $t("Bought.orders") }}</h1>
          <ErrorInfo
            class="Bought__error"
            :text="$t('Bought.somethingWentWrong')"
            v-if="error?.message"
          />
          <template v-else>
            <Loader class="Bought__loader" v-if="loading" />
            <BoughtOrderList
              v-else-if="orderProductsData.length > 0"
              @estimate-order="(id) => estimateOrder(id)"
              :delivery-methods="deliveryMethods"
              :order-products-data="orderProductsData"
            />
            <EmptyInfo
              v-else
              class="Bought__empty"
              :title="$t('Bought.empty')"
              :description="$t('Bought.noBoughtProducts')"
              :img="images.basket"
            />
          </template>
        </div>
      </div>
      <EstimateOrder
        @toggle-is-open="toggleIsOpen"
        @add-review-order="addReviewOrder"
        :order="currentOrder.order"
        v-if="isOpen"
      />
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.BoughtPage {
  flex: 1 0 auto;
  min-height: 85vh;
}
.Bought {
  height: 100%;

  &__container {
    height: 100%;
  }

  &__h1 {
    font-weight: 400;
    @include adaptiv-font(40, 24);
    line-height: 23px;
    color: $black;
    margin: 25px 0;
  }

  &__loader {
    width: 100%;
    height: 60vh;
  }

  &__empty {
    height: 60vh;
  }
}
</style>
