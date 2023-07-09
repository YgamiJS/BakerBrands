import type { ICategories, IProduct, ISortBy } from "@/types";

import { db } from "@/services/vuefire";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const categories = ref<ICategories>({ categories: ["tshirts", "hoodies", "trousers", "hats"] });
  const currentProduct = ref<IProduct>();
  const loading = ref<boolean>(false);
  const sortBy = ref<ISortBy>({
    firstSortBy: ["byPrice"],
    secondSortBy: ["byPopularity"]
  });
  let length: number = 0;

  let lastVisible: null | object = null;

  /*
    fetchCurrentProducts
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
    documentSnapshots.forEach((product) => {
      const prod = {
        ...product.data()
      };

      fbProducts.push(prod as IProduct);
    });

    loading.value = false;

    products.value = fbProducts;
  };

  const fetchCurrentProduct = async (id: string) => {
    loading.value = true;

    const fbProduct = await getDoc(doc(db, "products", id));

    currentProduct.value = fbProduct.data() as IProduct;

    loading.value = false;
  };

  const fetchProductsByCategory = async (queryCategory: IProduct["category"]) => {
    loading.value = true;

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
    documentSnapshots.forEach((product) => {
      const prod = {
        ...product.data()
      };

      fbProducts.push(prod as IProduct);
    });

    loading.value = false;

    products.value = fbProducts;
  };

  const fetchProducts = async () => {
    loading.value = true;

    const fbProductsStore = query(collection(db, "products"), orderBy("name"), limit(16));
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    documentSnapshots.forEach((product) => {
      const prod = {
        ...product.data()
      };

      fbProducts.push(prod as IProduct);
    });

    loading.value = false;

    products.value = fbProducts;
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
    documentSnapshots.forEach((product) => {
      const prod = {
        ...product.data()
      };

      fbProducts.push(prod as IProduct);
    });

    loading.value = false;

    products.value = fbProducts;
  };

  return {
    categories,
    currentProduct,
    fetchCurrentProduct,
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
