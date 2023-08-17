import type { IFavoriteProduct } from "./favorite";

export interface IOrderProduct extends IFavoriteProduct {
  transferDate: Date;
}
