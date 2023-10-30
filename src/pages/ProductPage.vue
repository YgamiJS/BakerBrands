<script setup lang="ts">
import { images } from "@/assets/images";
import CounterBasketProduct from "@/components/CounterBasketProduct.vue";
import GoBackButton from "@/components/GoBackButton.vue";
import Loader from "@/components/Loader.vue";
import Location from "@/components/Location.vue";
import ModalReview from "@/components/ModalReview.vue";
import ProductItemSwiper from "@/components/ProductItemSwiper.vue";
import ProductRating from "@/components/ProductRating.vue";
import RatingTable from "@/components/RatingTable.vue";
import ReviewList from "@/components/ReviewList.vue";
import ShareButton from "@/components/ShareButton.vue";
import FavoriteButton from "@/components/UI/FavoriteButton.vue";
import { useBasketStore } from "@/store/basket";
import { useFavoritesStore } from "@/store/favorites";
import { useProductsStore } from "@/store/products";
import { useWatchedProductsStore } from "@/store/watchedProducts";
import { type IProduct, type IReview, Routes } from "@/types";
import { storeToRefs } from "pinia";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, onMounted, ref, type VNodeRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import { RouterLink } from "vue-router";

const router = useRouter();
const route = useRoute();

const prev = ref<null | VNodeRef>(null);
const next = ref<null | VNodeRef>(null);

const id = ref<string>(route.params.id as string);

const { t } = useI18n();

const { fetchCurrentProduct } = useProductsStore();
const { addWatchedProduct } = useWatchedProductsStore();
const { currentProduct, loading } = storeToRefs(useProductsStore());
const {
  addBasketProduct,
  addBasketProductSize,
  decrementBasketProductCount,
  fetchCurrentBasketProduct,
  incrementBasketProductCount,
  removeBasketProductSize
} = useBasketStore();
const { addFavoriteProduct, removeFavoriteProduct } = useFavoritesStore();
const { favoriteProducts } = storeToRefs(useFavoritesStore());
const { basketProducts } = storeToRefs(useBasketStore());
const selectedSizes = ref<string[]>([]);
const currentImg = ref<string>("");
const buttonError = ref<boolean>(false);
const currentReviewIndex = ref<number>(0);
const currentReview = computed<IReview>(
  () =>
    currentProduct?.value?.reviews?.find(
      (review) => currentProduct?.value?.reviews?.indexOf(review) == currentReviewIndex.value
    )!
);

const currentLocation = computed<string>(() => window.location.toString());

const isOpen = ref<boolean>(false);
const minCountSize = 1;

const changeCurrentImg = (url: string) => (currentImg.value = url);

const toggleIsOpen = () => (isOpen.value = !isOpen.value);

const isInBasket = computed(
  () => !!basketProducts.value.find((basketProduct) => basketProduct.id == id.value)
);

const isLike = computed(
  () => !!favoriteProducts.value.find((favoriteProduct) => favoriteProduct.id == id.value)?.id
);

const currentBasketProduct = computed(() =>
  basketProducts.value.find((basketProduct) => basketProduct.id == currentProduct?.value?.id)
);

const addToBasketProducts = async (productId: IProduct["id"], selectedSizes: string[]) => {
  if (selectedSizes.length < 1) {
    buttonError.value = true;
    return;
  }

  await addBasketProduct(productId, selectedSizes);
};

const addOrRemoveSelectedSize = async (size: string) => {
  const sizes = currentBasketProduct?.value?.sizes;

  if (selectedSizes.value.includes(size) || sizes?.includes(size)) {
    if (sizes?.length && sizes?.length <= 1) return;

    selectedSizes.value = selectedSizes.value.filter((currentsize) => currentsize !== size);
    await removeBasketProductSize(id.value, size);
  } else {
    buttonError.value = false;
    selectedSizes.value.push(size);
    await addBasketProductSize(id.value, size);
  }
};

const slideNextReview = () => {
  if (
    currentProduct?.value?.reviews?.length &&
    currentReviewIndex.value + 1 == currentProduct?.value?.reviews?.length
  )
    return;

  currentReviewIndex.value += 1;
};

const slidePrevReview = () => {
  if (currentReviewIndex.value > 0) currentReviewIndex.value -= 1;
};

const addOrRemoveToFavoriteProducts = async (product: IProduct) => {
  !isLike.value ? await addFavoriteProduct(product.id) : await removeFavoriteProduct(product.id);
};

const setCurrentReview = (index: number) => (currentReviewIndex.value = index);

const decrementBasketProductCountMod = (id: string) => {
  decrementBasketProductCount(id);

  if (!currentBasketProduct.value?.count) selectedSizes.value = [];
};

onMounted(async () => {
  await fetchCurrentProduct(id.value);
  await fetchCurrentBasketProduct(id.value);

  currentProduct.value == undefined
    ? router.push({ name: Routes.SHOPNEW })
    : await addWatchedProduct(id.value);
});
</script>

<template>
  <main class="Product">
    <section class="Product-info">
      <div class="Product-info__container container" v-if="loading">
        <div class="Product-info__wrap-loader">
          <Loader class="Product-info__loader" />
        </div>
      </div>
      <div class="Product-info__container container" v-else>
        <Location />
        <GoBackButton />
        <div class="Product__head">
          <h1 class="Product-info__h1">
            {{ $t(`Categories.${currentProduct?.category}`) }} {{ currentProduct?.name }}
          </h1>
          <ShareButton
            class="Product__share"
            :title="currentProduct?.name || ''"
            :text="currentProduct?.description || ''"
            :url="currentLocation"
          />
        </div>
        <div class="Product-info__info" v-if="!loading">
          <div class="Product-info__wrap">
            <div class="pc-swiper pc-swiper-wrap">
              <button
                class="pc-swiper__button pc-swiper__prev"
                ref="prev"
                v-if="currentProduct?.images?.length && currentProduct?.images?.length + 1 > 3"
              >
                <img class="pc-swiper__arrowimg" :src="images.arrowUp" />
              </button>
              <swiper
                class="pc-swiper"
                :navigation="{ prevEl: prev, nextEl: next }"
                :spaceBetween="'30px'"
                :slidesPerView="3"
                :direction="'vertical'"
                :modules="[Navigation]"
              >
                <swiper-slide
                  class="pc-swiper__slide"
                  v-for="img of currentProduct?.images
                    ? [currentProduct?.img, ...currentProduct?.images]
                    : []"
                  @click="changeCurrentImg(img)"
                  :key="img"
                >
                  <img class="pc-swiper__img" :src="img" />
                </swiper-slide>
              </swiper>
              <button
                class="pc-swiper__button pc-swiper__next"
                ref="next"
                v-if="currentProduct?.images?.length && currentProduct?.images?.length + 1 > 3"
              >
                <img class="pc-swiper__arrowimg pc-swiper__arrowimg_bottom" :src="images.arrowUp" />
              </button>
            </div>
            <img
              class="Product-info__img"
              :src="currentImg ? currentImg : currentProduct?.img"
              :alt="currentProduct?.name"
            />
            <ProductItemSwiper
              class="mob-swiper"
              :navigation="true"
              :currentProduct="currentProduct || {} as IProduct"
            />
            <div class="Product-info__content">
              <h2 class="Product-info__name">
                {{ $t(`Categories.${currentProduct?.category}`) }} {{ currentProduct?.name }}
              </h2>
              <ProductRating
                class="Product-info__rating"
                :rating="currentProduct?.rating!"
                v-if="currentProduct?.rating"
              />
              <p class="Product-info__description Product-info__p">
                {{ currentProduct?.description }}
              </p>
              <p class="Product-info__category Product-info__p">
                {{ $t("Categories.category") }} : {{ $t(`Categories.${currentProduct?.category}`) }}
              </p>
              <p class="Product-info__price Product-info__p">
                {{ currentProduct?.price }} {{ $t("PayСurrency") }}
              </p>
              <p class="Product-info__new Product-info__p" v-if="currentProduct?.new">
                {{ $t("Product.new") }}
              </p>
              <p class="Product-info__popularity Product-info__p" v-if="currentProduct?.popularity">
                {{ $t("Product.popularity") }}
              </p>
              <div class="Product-info__sizes">
                <p
                  class="Product-info__size"
                  v-for="size of currentProduct?.sizes"
                  @click="addOrRemoveSelectedSize(size!)"
                  :class="{'selected': selectedSizes.includes(size as string) || basketProducts.find(basketProduct => basketProduct.id === currentProduct?.id )?.sizes?.includes(size!)}"
                  :key="size"
                >
                  {{ size }}
                </p>
              </div>
              <div class="Product-info__inStockCount">
                {{ $t("Product.aviable", { count: currentProduct?.inStock }) }}
              </div>
              <div class="Product-info__btns">
                <div class="Product-info__noAviable" v-if="!!currentProduct?.inStock == false">
                  {{ $t("Product.noAviable") }}
                </div>
                <button
                  class="Product-info__buy-button"
                  v-else-if="!isInBasket"
                  :disabled="!!currentProduct?.inStock == false"
                  @click="addToBasketProducts(currentProduct!.id, selectedSizes)"
                >
                  {{
                    buttonError
                      ? t("Product.minSize", { count: minCountSize })
                      : t("Product.addToBasket")
                  }}
                </button>
                <div class="Product-info__bought" v-else>
                  <RouterLink class="Product-info__basketLink" to="/Basket/">{{
                    $t("Product.goToBasket")
                  }}</RouterLink>
                  <CounterBasketProduct
                    :basket-product-id="id"
                    @increment="incrementBasketProductCount(id)"
                    @decrement="decrementBasketProductCountMod(id)"
                  />
                </div>
                <FavoriteButton
                  @click="currentProduct && addOrRemoveToFavoriteProducts(currentProduct)"
                  :class="{ favorite__inFavorite: isLike }"
                />
              </div>
            </div>
          </div>
          <RatingTable
            class="Product-info__ratingTable"
            :rating="
              currentProduct?.rating || {
                rating: 0,
                ratings: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
              }
            "
          />
          <ReviewList
            :reviews="currentProduct?.reviews || []"
            @toggle-is-open="toggleIsOpen"
            @set-current-review="setCurrentReview"
          />
          <ModalReview
            v-if="isOpen"
            @toggle-is-open="toggleIsOpen"
            @slide-next-review="slideNextReview"
            @slide-prev-review="slidePrevReview"
            :reviewerid="currentReview?.reviewerid"
            :rating="currentReview?.rating"
            :reviewimg="currentReview?.images[0]"
            :comment="currentReview?.comment"
            :length="currentProduct?.reviews?.length || 0"
            :review-index="currentProduct?.reviews?.indexOf(currentReview) || 0"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
@import "@/assets/scss/App.scss";
.Product {
  flex: 1 0 auto;

  &__head {
    display: flex;
    justify-content: space-between;
  }
}

.pc-swiper {
  width: 200px;
  height: 65vh;

  &__slide {
    height: 50px;
  }

  &__img {
    cursor: pointer;
    transition: 100ms all ease;
    object-fit: cover;
    width: 100%;
    height: 100%;

    &:hover {
      filter: brightness(70%);
    }
  }

  &__button {
    background: $whiteSmoke;
    cursor: pointer;
    outline: none;
    border: none;
    width: 100%;
    height: 60px;
  }

  &__next:disabled,
  &__prev:disabled {
    background: $white;
  }

  &__arrowimg {
    width: 50%;
    height: 100%;

    &_bottom {
      transform: rotate(-180deg);
    }
  }

  @media (max-width: 950px) {
    display: none;
  }
}

.mob-swiper {
  display: none;

  :deep(.mob-swiper__img) {
    background: $graySkeleton;
    object-fit: fill;
    width: 100%;
    height: 420px;

    @media (max-width: 960px) and (min-width: 767px) {
      max-width: 55%;
      margin-top: 20px;
    }

    @media (max-width: 767px) {
      margin-top: 10px;
      max-width: 100%;
      height: 50vh;
    }
  }

  @media (max-width: 767px) {
    display: block;
  }
}

.Product-info {
  &__wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 80px;
  }

  &__h1 {
    margin-top: 30px;
    font-weight: 900;
    padding: 10px 0 20px 0;
    @include adaptiv-font(32, 20);

    @media (max-width: 950px) {
      display: none;
    }
  }

  &__img {
    object-fit: fill;
    height: 75vh;
    max-width: 45%;
    width: 100%;

    @media (max-width: 960px) and (min-width: 767px) {
      max-width: 55%;
      margin-top: 20px;
      height: 50vh;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__wrap-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  &__content {
    display: inline-flex;
    flex-direction: column;
    gap: 10px;
    max-width: 30%;
    width: 100%;
    border-radius: 28px;
    padding: 20px;

    @media (max-width: 960px) and (min-width: 767px) {
      max-width: 40%;
    }

    @media (max-width: 767px) {
      padding: 20px 0px;
      max-width: 100%;
    }
  }

  &__name {
    font-weight: 900;
    @include adaptiv-font(40, 20);
  }

  &__rating {
    justify-content: start;
  }

  &__ratingTable {
    margin-bottom: 20px;
  }

  &__description {
    @include adaptiv-font(22, 18);
    font-weight: 600;
  }

  &__inStockCount {
    background: $black;
    width: fit-content;
    border-radius: 14px;
    padding: 10px 20px;
    font-size: 18px;
    color: $white;
  }

  &__category {
    font-weight: 700;
  }

  &__price {
    background: $lime50;
    display: flex;
    width: fit-content;
    border-radius: 14px;
    color: $white;
    font-weight: 800;
    padding: 10px 20px;
    font-weight: 800;
    font-size: 24px;
    text-transform: capitalize;
  }

  &__new {
    background: $black;
    display: flex;
    width: fit-content;
    border-radius: 14px;
    color: $white;
    padding: 10px 20px;
    font-weight: 500;
  }

  &__popularity {
    background: $black;
    display: flex;
    width: fit-content;
    border-radius: 14px;
    color: $white;
    padding: 10px 20px;
    font-weight: 500;
  }

  &__sizes {
    display: flex;
    gap: 5px;
  }

  &__size {
    background: $whiteSmoke;
    border-radius: 5px;
    cursor: pointer;
    font-size: 17px;
    font-weight: 500;
    padding: 5px 10px;
    &.selected {
      background: $black;
      color: $white;
    }
  }

  &__noAviable {
    background: $red100;
    display: flex;
    align-items: center;
    cursor: not-allowed;
    width: fit-content;
    border-radius: 14px;
    color: $white;
    padding: 10px 20px;
    font-weight: 500;
  }

  &__buy-button {
    background: $lime50;
    font-weight: 600;
    color: $white;
    cursor: pointer;
    border-radius: 14px;
    outline: none;
    border: none;
    padding: 15px 25px;
    font-size: 16px;

    &:disabled {
      background: $grey;
    }
  }

  &__basketLink {
    background: $gray;
    border-radius: 14px;
    display: flex;
    align-items: center;
    color: $blue100;
    padding: 8px 15px;
    text-align: center;
  }

  &__bought {
    display: flex;
    gap: 10px;
  }

  &__btns {
    display: flex;
    gap: 10px;
  }
}
</style>
