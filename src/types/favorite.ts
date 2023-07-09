import type { IProduct } from "./product";

export interface IFavoriteProduct extends IProduct {
  count: number;
}
