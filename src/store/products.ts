import type { ICategories, ICategory, IFind, IProduct, ISetPrice, ISortBy, SortBy } from "@/types";

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
  const categories = ref<ICategories>({
    categories: ["all", "tshirts", "hoodies", "trousers", "hats"]
  });
  const currentProduct = ref<IProduct>();
  const loading = ref<boolean>(false);
  const sortBy = ref<ISortBy>({
    firstSortBy: ["byPrice"],
    secondSortBy: ["byPopularity"]
  });

  const currentCategory = ref<ICategory>("all");
  const currentFilter = ref<SortBy>();
  const maxPriceByCategory = ref<number>(0);
  const minPriceByCategory = ref<number>(0);
  let length: number = 0;

  let lastVisible: null | object = null;

  /*
    fetchByFindField
    fetchProductsByCategoryWithSettingPrice
    fetchMinAndMaxPriceByCategory
    fetchCurrentProducts
    fetchProduct
    fetchProductsWithScrolling
    fetchProductsByCategory
    sortProductsBySortBy
  */

  const fetchByFindField = async ({ findfield }: IFind) => {
    if (!(findfield.trim().length > 0)) return;

    loading.value = true;

    const fbProductsStore =
      currentCategory.value == "all"
        ? query(collection(db, "products"), where("name", "==", findfield), limit(16))
        : query(
            collection(db, "products"),
            where("name", "==", findfield),
            orderBy(currentCategory.value),
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

  const fetchMinAndMaxPriceByCategory = async () => {
    const max = Math.max(
      ...products.value
        .filter((product) =>
          currentCategory.value == "all" ? product : product.category == currentCategory.value
        )
        .map((e) => +e.price)
    );

    const min = Math.min(
      ...products.value
        .filter((product) =>
          currentCategory.value == "all" ? product : product.category == currentCategory.value
        )
        .map((e) => +e.price)
    );

    maxPriceByCategory.value = max == -Infinity ? 0 : max;
    minPriceByCategory.value = min == Infinity ? 0 : min;
  };

  const fetchProductsByCategoryWithSettingPrice = async ({ maxPrice, minPrice }: ISetPrice) => {
    loading.value = true;

    const fbProductsStore =
      currentCategory.value == "all"
        ? query(
            collection(db, "products"),
            orderBy("price", "desc"),
            where("price", ">=", String(minPrice)),
            where("price", "<=", String(maxPrice)),
            limit(16)
          )
        : query(
            collection(db, "products"),
            where("price", ">=", String(minPrice)),
            where("price", "<=", String(maxPrice)),
            orderBy("price", "desc"),
            orderBy(currentCategory.value),
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

  const sortProductsBySortBy = async (sortBy: SortBy) => {
    loading.value = true;

    const filter = sortBy.slice(2).toLocaleLowerCase();
    currentFilter.value = filter as SortBy;

    const fbProductsStore =
      currentCategory.value == "all"
        ? query(collection(db, "products"), orderBy(filter, "desc"), limit(16))
        : query(
            collection(db, "products"),
            where("category", "==", currentCategory.value),
            orderBy(filter, "desc"),
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

  const fetchCurrentProduct = async (id: string) => {
    loading.value = true;

    const fbProduct = await getDoc(doc(db, "products", id));

    currentProduct.value = fbProduct.data() as IProduct;

    loading.value = false;
  };

  const fetchProductsByCategory = async () => {
    loading.value = true;

    const fbProductsStore =
      currentCategory.value == "all"
        ? currentFilter.value
          ? query(collection(db, "products"), orderBy(currentFilter.value, "desc"), limit(16))
          : query(collection(db, "products"), orderBy("name"), limit(16))
        : currentFilter.value
        ? query(
            collection(db, "products"),
            where("category", "==", currentCategory.value),
            orderBy(currentFilter.value, "desc"),
            limit(16)
          )
        : query(
            collection(db, "products"),
            orderBy("name"),
            where("category", "==", currentCategory.value),
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

  const fetchProductsWithScrolling = async (sortBy?: SortBy) => {
    loading.value = true;

    const fbProductsStore =
      currentCategory.value !== "all"
        ? sortBy
          ? query(
              collection(db, "products"),
              orderBy(sortBy, "desc"),
              startAfter(lastVisible),
              limit(16),
              where("category", "==", currentCategory.value)

              // queryCategory true
              // sortBy true
            )
          : query(
              collection(db, "products"),
              orderBy("name"),
              startAfter(lastVisible),
              limit(16),
              where("category", "==", currentCategory.value)

              // queryCategory true
              // sortBy false
            )
        : sortBy
        ? query(
            collection(db, "products"),
            orderBy(sortBy, "desc"),
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
    currentCategory,
    currentProduct,
    fetchByFindField,
    fetchCurrentProduct,
    fetchMinAndMaxPriceByCategory,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductsByCategoryWithSettingPrice,
    fetchProductsWithScrolling,
    length,
    loading,
    maxPriceByCategory,
    minPriceByCategory,
    products,
    sortBy,
    sortProductsBySortBy
  };
});
