import type { IFavoriteProduct } from "./favorite";

export interface IBasketProduct extends IFavoriteProduct {
  count: number;
}
