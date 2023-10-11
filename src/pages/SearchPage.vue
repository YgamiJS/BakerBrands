<script setup lang="ts">
import GlobalSearch from "@/components/GlobalSearch.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Location from "@/components/Location.vue";
import ErrorInfo from "@/components/UI/ErrorInfo.vue";
import { db } from "@/services/vuefire";
import { type IFind, type IProduct, Routes } from "@/types";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const results = ref<IProduct[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<any | null>(null);

const onSubmit = async (query: IFind) => {
  await router.push({ name: Routes.SHOPNEW });

  const elements = document.querySelectorAll(".find__findfield");

  elements.forEach((item) => {
    const event = new KeyboardEvent("change");
    (item as HTMLInputElement).value = query.findfield;
    item.dispatchEvent(event);
  });
};

const onSearch = async (q: IFind) => {
  try {
    isLoading.value = true;

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

    isLoading.value = false;
  } catch (err) {
    error.value = err;
  }
};
</script>

<template>
  <main class="Search">
    <section class="Search-section">
      <div class="Search-section__container container">
        <Location class="location" />
        <GoBackButton />
        <ErrorInfo v-if="error?.message" :text="$t('Favorites.somethingWentWrong')" />
        <div class="Search-section__form" v-else>
          <h1 class="Search__h1">{{ $t("Search.findAnyWay") }}</h1>
          <GlobalSearch
            :is-loading="isLoading"
            :results="results"
            @submit="onSubmit"
            @search="onSearch"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";

.Search {
  flex: 1 0 auto;
  min-height: 80vh;

  &__h1 {
    @include adaptiv-font(42, 28);
    text-align: center;
    margin-bottom: 50px;
  }
}

.Search-section {
  &__form {
    display: flex;
    min-height: 80vh;
    flex-direction: column;
    margin-top: 15%;
    width: 100%;

    @media (max-width: 767px) {
      margin-top: 20%;
    }
  }
}
</style>
