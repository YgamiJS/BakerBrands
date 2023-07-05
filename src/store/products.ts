import type { ICategories, IProduct, ISortBy } from "@/types";

import { db } from "@/services/vuefire";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const categories = ref<ICategories>({ categories: ["tshirts", "hoodies", "trousers", "hats"] });
  const loading = ref<boolean>(false);
  const sortBy = ref<ISortBy>({
    firstSortBy: ["byPrice"],
    secondSortBy: ["byPopularity"]
  });
  let length: number = 0;

  let lastVisible: null | object = null;

  /*
    fetchProduct
    fetchProductsWithScrolling
    fetchProductsByCategory
    sortProductsBySortBy
  */

  const sortProductsBySortBy = async (sortBy: ISortBy["firstSortBy"] | ISortBy["secondSortBy"]) => {
    loading.value = true;

    const fbProductsStore = query(collection(db, "products"), orderBy(sortBy[0]), limit(16));
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    (async () =>
      documentSnapshots.forEach((product) => {
        const prod: IProduct = {
          id: product.id,
          ...product.data()
        };

        fbProducts.push(prod);

        products.value = fbProducts;
      }))().then(() => (loading.value = false));
  };

  const fetchProductsByCategory = async (queryCategory: IProduct["category"]) => {
    loading.value = true;

    console.log(loading.value);

    const fbProductsStore = query(
      collection(db, "products"),
      orderBy("name"),
      where("category", "==", queryCategory),
      limit(16)
    );
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    (async () =>
      documentSnapshots.forEach((product) => {
        const prod: IProduct = {
          id: product.id,
          ...product.data()
        };

        fbProducts.push(prod);

        products.value = fbProducts;
      }))()
      .then(() => (loading.value = false))
      .then(() => console.log(loading.value, products.value.length));
  };

  const fetchProducts = async () => {
    loading.value = true;

    const fbProductsStore = query(collection(db, "products"), orderBy("name"), limit(16));
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    (async () =>
      documentSnapshots.forEach((product) => {
        const prod: IProduct = {
          id: product.id,
          ...product.data()
        };

        fbProducts.push(prod);

        products.value = fbProducts;
      }))()
      .then(() => (loading.value = false))
      .then(() => console.log(loading.value, products.value.length));
  };

  const fetchProductsWithScrolling = async (
    queryCategory?: IProduct["category"],
    sortBy?: ISortBy["firstSortBy"] | ISortBy["secondSortBy"]
  ) => {
    loading.value = true;

    const fbProductsStore = queryCategory
      ? sortBy
        ? query(
            collection(db, "products"),
            orderBy(sortBy[0], "desc"),
            startAfter(lastVisible),
            limit(16),
            where("category", "==", queryCategory)

            // queryCategory true
            // sortBy true
          )
        : query(
            collection(db, "products"),
            orderBy("name"),
            startAfter(lastVisible),
            limit(16),
            where("category", "==", queryCategory)

            // queryCategory true
            // sortBy false
          )
      : sortBy
      ? query(
          collection(db, "products"),
          orderBy(sortBy[0], "desc"),
          startAfter(lastVisible),
          limit(16)
        )
      : // queryCategory false
        // sortBy true

        query(collection(db, "products"), orderBy("name"), startAfter(lastVisible), limit(16));

    // queryCategory false
    // sortBy false

    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    (async () =>
      documentSnapshots.forEach((product) => {
        const prod: IProduct = {
          id: product.id,
          ...product.data()
        };

        fbProducts.push(prod);

        products.value = fbProducts;
      }))().then(() => (loading.value = false));
  };

  return {
    categories,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductsWithScrolling,
    length,
    loading,
    products,
    sortBy,
    sortProductsBySortBy
  };
});
