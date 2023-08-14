<script setup lang="ts">
import type { IFind, IProduct } from "@/types";

import GlobalSearch from "@/components/GlobalSearch.vue";
import { db } from "@/services/vuefire";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const results = ref<IProduct[]>([]);

const onSubmit = async (query: IFind) => {
  await router.push("/Shop/");

  const elements = document.querySelectorAll(".find__findfield");

  elements.forEach((item) => {
    const event = new KeyboardEvent("change");
    (item as HTMLInputElement).value = query.findfield;
    item.dispatchEvent(event);
  });
};

const onSearch = async (q: IFind) => {
  const fbProductsStore = query(
    collection(db, "products"),
    where("name", "==", q.findfield),
    limit(6)
  );

  const documentSnapshots = await getDocs(fbProductsStore);

  const fbProducts: IProduct[] = [];
  documentSnapshots.forEach((product) => {
    const prod = {
      ...product.data()
    };

    fbProducts.push(prod as IProduct);
  });

  results.value = fbProducts;
};
</script>

<template>
  <main class="Search">
    <section class="Search-section">
      <div class="Search-section__container container">
        <h1 class="Search__h1">{{ $t("Search.findAnyWay") }}</h1>
        <GlobalSearch :results="results" @submit="onSubmit" @search="onSearch" />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Search {
  flex: 1 0 auto;
  display: flex;
  min-height: 90vh;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &__h1 {
    @include adaptiv-font(42, 24);
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>
