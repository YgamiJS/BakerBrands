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
  const currentQuery = ref<string>("");
  const currentCategory = ref<ICategory>("all");
  const currentFilter = ref<SortBy>();
  const currentMinPrice = ref<number>(0);
  const currentMaxPrice = ref<number>(0);
  const maxPriceByCategory = ref<number>(0);
  const minPriceByCategory = ref<number>(0);
  const error = ref<any | null>(null);
  let length: number = 0;

  let lastVisible: null | object = null;

  /*
    fetchByFindField
    fetchProductsByCategoryWithSettingPrice
    fetchMinAndMaxPriceByCategory
    fetchCurrentProduct
    fetchProduct
    fetchProductsWithScrolling
    fetchProductsByCategory
    sortProductsBySortBy
    resetCategory
  */

  const resetCategory = () => (currentCategory.value = "all");

  const fetchByFindField = async ({ findfield }: IFind) => {
    try {
      if (findfield.trim().length < 1) {
        fetchProducts();
        return;
      }

      currentQuery.value = findfield;

      loading.value = true;

      const fbProductsStore =
        currentCategory.value == "all"
          ? query(collection(db, "products"), where("name", "==", findfield), limit(16))
          : query(
              collection(db, "products"),
              where("name", "==", findfield),
              // orderBy(currentCategory.value),
              where("category" , "==" , currentCategory.value),
              limit(16)
            );
      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];
      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      loading.value = false;

      products.value = fbProducts;
    } catch (err) {
      error.value = err;
    }
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
    try {
      loading.value = true;

      currentMaxPrice.value = maxPrice;
      currentMinPrice.value;

      const fbProductsStore =
        currentCategory.value == "all"
          ? query(
              collection(db, "products"),
              orderBy("price", "desc"),
              where("price", ">=", minPrice),
              where("price", "<=", maxPrice),
              limit(16)
            )
          : query(
              collection(db, "products"),
              where("price", ">=", minPrice),
              where("price", "<=", maxPrice),
              orderBy("price", "desc"),
              // orderBy(currentCategory.value),
              where("category", "==", currentCategory.value),
              limit(16)
            );

      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];
      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      loading.value = false;
      products.value = fbProducts;
    } catch (err) {
      error.value = err;
    }
  };

  const sortProductsBySortBy = async (sortBy: SortBy) => {
    try {
      loading.value = true;

      const filter = sortBy.slice(2).toLocaleLowerCase();
      currentFilter.value = filter as SortBy;

      const fbProductsStore =
        currentCategory.value == "all"
          ? currentMaxPrice.value && currentMinPrice.value
            ? query(
                collection(db, "products"),
                where("price", ">=", currentMinPrice.value),
                where("price", "<=", currentMaxPrice.value),
                orderBy(filter, "asc"),
                limit(16)
              )
            : query(collection(db, "products"), orderBy(filter, "asc"), limit(16))
          : currentMaxPrice.value && currentMinPrice.value
          ? query(
              collection(db, "products"),
              where("price", ">=", currentMinPrice.value),
              where("price", "<=", currentMaxPrice.value),
              where("category", "==", currentCategory.value),
              orderBy(filter, "asc"),
              limit(16)
            )
          : query(
              collection(db, "products"),
              where("category", "==", currentCategory.value),
              orderBy(filter, "asc"),
              limit(16)
            );
      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];
      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      loading.value = false;

      products.value = fbProducts;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchCurrentProduct = async (id: string) => {
    try {
      loading.value = true;

      const fbProduct = await getDoc(doc(db, "products", id));

      const data = fbProduct.data();

      currentProduct.value = data as IProduct;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchProductsByCategory = async () => {
    try {
      loading.value = true;

      const fbProductsStore =
        currentCategory.value == "all"
          ? currentFilter.value
            ? currentMaxPrice.value && currentMinPrice.value
              ? query(
                  collection(db, "products"),
                  orderBy(currentFilter.value, "desc"),
                  where("price", ">=", currentMinPrice.value),
                  where("price", "<=", currentMaxPrice.value),
                  limit(16)
                )
              : query(collection(db, "products"), orderBy(currentFilter.value, "desc"), limit(16))
            : currentMaxPrice.value && currentMinPrice.value
            ? query(
                collection(db, "products"),
                where("price", ">=", currentMinPrice.value),
                where("price", "<=", currentMaxPrice.value),
                orderBy("price", "desc"),
                limit(16)
              )
            : query(collection(db, "products"), orderBy("name"), limit(16))
          : //other categories
          currentFilter.value
          ? currentMaxPrice.value && currentMinPrice.value
            ? query(
                collection(db, "products"),
                where("category", "==", currentCategory.value),
                where("price", ">=", currentMinPrice.value),
                where("price", "<=", currentMaxPrice.value),
                orderBy(currentFilter.value, "desc"),
                limit(16)
              )
            : query(
                collection(db, "products"),
                where("category", "==", currentCategory.value),
                orderBy(currentFilter.value, "desc"),
                limit(16)
              )
          : currentMaxPrice.value && currentMaxPrice.value
          ? query(
              collection(db, "products"),
              where("category", "==", currentCategory.value),
              where("price", ">=", currentMinPrice.value),
              where("price", "<=", currentMaxPrice.value),
              orderBy("price", "desc"),
              limit(16)
            )
          : query(
              collection(db, "products"),
              where("category", "==", currentCategory.value),
              limit(16)
            );
      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];
      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      loading.value = false;

      products.value = fbProducts;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchProducts = async () => {
    try {
      loading.value = true;

      const fbProductsStore = query(collection(db, "products"), orderBy("name"), limit(16));
      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];

      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      products.value = fbProducts;

      loading.value = false;
    } catch (err) {
      error.value = err;
    }
  };

  const fetchProductsWithScrolling = async (sortBy?: SortBy) => {
    try {
      loading.value = true;

      const fbProductsStore =
        currentCategory.value !== "all"
          ? sortBy
            ? maxPriceByCategory.value && minPriceByCategory.value
              ? query(
                  collection(db, "products"),
                  orderBy(sortBy, "desc"),
                  startAfter(lastVisible),
                  limit(16),
                  where("category", "==", currentCategory.value),
                  where("price", ">=", minPriceByCategory.value),
                  where("price", "<=", maxPriceByCategory.value),
                  orderBy("price", "desc")
                  // setting price true
                  // queryCategory true
                  // sortBy true
                )
              : query(
                  collection(db, "products"),
                  orderBy(sortBy, "desc"),
                  startAfter(lastVisible),
                  limit(16),
                  where("category", "==", currentCategory.value)

                  // setting price false
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
          ? maxPriceByCategory.value && minPriceByCategory.value
            ? query(
                collection(db, "products"),
                orderBy(sortBy, "desc"),
                startAfter(lastVisible),
                limit(16),
                where("category", "==", currentCategory.value),
                where("price", ">=", minPriceByCategory.value),
                where("price", "<=", maxPriceByCategory.value),
                orderBy("price", "desc"),
                where("category", "==", currentCategory.value)

                // setting price true
                // queryCategory true
                // sortBy true
              )
            : query(
                collection(db, "products"),
                orderBy(sortBy, "desc"),
                startAfter(lastVisible),
                limit(16)
              )
          : // queryCategory false
          // sortBy true

          maxPriceByCategory.value && minPriceByCategory.value
          ? query(
              collection(db, "products"),
              startAfter(lastVisible),
              where("category", "==", currentCategory.value),
              where("price", ">=", minPriceByCategory.value),
              where("price", "<=", maxPriceByCategory.value),
              orderBy("price", "desc"),
              limit(16)
            )
          : query(collection(db, "products"), orderBy("name"), startAfter(lastVisible), limit(16));

      // queryCategory false
      // sortBy false

      const documentSnapshots = await getDocs(fbProductsStore);
      length = documentSnapshots.size;
      lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const fbProducts: IProduct[] = [];
      documentSnapshots.forEach(async (product) => {
        const prod = {
          ...product.data()
        };

        fbProducts.push(prod as IProduct);
      });

      loading.value = false;

      products.value = fbProducts;
    } catch (err) {
      error.value = err;
    }
  };

  return {
    categories,
    currentCategory,
    currentProduct,
    currentQuery,
    error,
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
    resetCategory,
    sortBy,
    sortProductsBySortBy
  };
});
