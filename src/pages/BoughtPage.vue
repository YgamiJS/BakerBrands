<script setup lang="ts">
import type { IDeliveryMethod } from "@/types";

import { images } from "@/assets/images";
import BoughtOrderList from "@/components/BoughtOrderList.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import EmptyInfo from "@/components/UI/EmptyInfo.vue";
import { useOrdersStore } from "@/store/bought";
import { deliveryOrganizations } from "@/types/enums/deliveryOrganizations";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const { fetchBoughtProducts, getBoughtProducts } = useOrdersStore();
const { loading, orderProductsData } = storeToRefs(useOrdersStore());

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

onMounted(async () => {
  await fetchBoughtProducts();
  await getBoughtProducts();
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
          <Loader class="Bought__loader" v-if="loading" />
          <BoughtOrderList
            v-else-if="orderProductsData.length > 0"
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
        </div>
      </div>
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
    height: 80vh;
  }

  &__empty {
    height: 60vh;
  }
}
</style>
