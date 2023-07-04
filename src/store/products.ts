import type { ICategories, IProduct, ISortBy } from "@/types";

import { db } from "@/services/vuefire";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductsStore = defineStore("products", () => {
  const products = ref<IProduct[]>([]);
  const categories = ref<ICategories>({ categories: ["tshirts", "hoodies", "trousers", "hats"] });
  let loading: boolean = false;
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
    loading = true;

    const fbProductsStore = query(collection(db, "products"), orderBy(sortBy[0]), limit(16));
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    documentSnapshots.forEach((product) => {
      const prod: IProduct = {
        category: product.data().category,
        description: product.data().description,
        favorite: product.data().favorite,
        id: product.id,
        img: product.data().img,
        name: product.data().name,
        new: product.data().new,
        popularity: product.data().popularity,
        price: product.data().price,
        sizes: product.data().sizes
      };

      fbProducts.push(prod);

      products.value = fbProducts;
      setTimeout(() => (loading = false));
    });
  };

  const fetchProductsByCategory = async (queryCategory: IProduct["category"]) => {
    loading = true;

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
      const prod: IProduct = {
        category: product.data().category,
        description: product.data().description,
        favorite: product.data().favorite,
        id: product.id,
        img: product.data().img,
        name: product.data().name,
        new: product.data().new,
        popularity: product.data().popularity,
        price: product.data().price,
        sizes: product.data().sizes
      };

      fbProducts.push(prod);

      products.value = fbProducts;
      setTimeout(() => (loading = false));
    });
  };

  const fetchProducts = async () => {
    loading = true;

    const fbProductsStore = query(collection(db, "products"), orderBy("name"), limit(16));
    const documentSnapshots = await getDocs(fbProductsStore);
    length = documentSnapshots.size;
    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

    const fbProducts: IProduct[] = [];
    documentSnapshots.forEach((product) => {
      const prod: IProduct = {
        category: product.data().category,
        description: product.data().description,
        favorite: product.data().favorite,
        id: product.id,
        img: product.data().img,
        name: product.data().name,
        new: product.data().new,
        popularity: product.data().popularity,
        price: product.data().price,
        sizes: product.data().sizes
      };

      fbProducts.push(prod);

      products.value = fbProducts;
      setTimeout(() => (loading = false));
    });
  };

  const fetchProductsWithScrolling = async (
    queryCategory?: IProduct["category"],
    sortBy?: ISortBy["firstSortBy"] | ISortBy["secondSortBy"]
  ) => {
    loading = true;

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
      const prod: IProduct = {
        category: product.data().category,
        description: product.data().description,
        favorite: product.data().favorite,
        id: product.id,
        img: product.data().img,
        name: product.data().name,
        new: product.data().new,
        popularity: product.data().popularity,
        price: product.data().price,
        sizes: product.data().sizes
      };

      fbProducts.push(prod);

      products.value.push(fbProducts);
      setTimeout(() => (loading = false));
    });
  };

  // const fetchProducts = async (
  //   queryCategory?: IProduct["category"],
  //   sortBy?: ISortBy["firstSortBy"] | ISortBy["secondSortBy"]
  // ) => {
  //   loading = true;
  //   const fbProductsStore =
  //     lastVisible != null
  //       ? !(!!queryCategory == false) && !(!!sortBy == false)
  //         ? query(
  //             collection(db, "products"),
  //             orderBy("name"),
  //             startAfter(lastVisible),
  //             limit(16),
  //             orderBy("name"),
  //             orderBy(...sortBy, "desc")
  //           )
  //         : !(!!queryCategory == false)
  //         ? query(
  //             collection(db, "products"),
  //             orderBy("name"),
  //             startAfter(lastVisible),
  //             where("category", "==", queryCategory),
  //             limit(16)
  //           )
  //         : query(collection(db, "products"), orderBy("name"), startAfter(lastVisible), limit(16))
  //       : query(collection(db, "products"), orderBy("name"), limit(16));
  //   const documentSnapshots = await getDocs(fbProductsStore);
  //   length = documentSnapshots.size;
  //   lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  //   const fbProducts: IProduct[] = [];
  //   documentSnapshots.forEach((product) => {
  //     const prod: IProduct = {
  //       category: product.data().category,
  //       description: product.data().description,
  //       favorite: product.data().favorite,
  //       id: product.id,
  //       img: product.data().img,
  //       name: product.data().name,
  //       new: product.data().new,
  //       price: product.data().price,
  //       sizes: product.data().sizes
  //     };

  //     fbProducts.push(prod);

  //     products.value = fbProducts;
  //   });
  // };

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
