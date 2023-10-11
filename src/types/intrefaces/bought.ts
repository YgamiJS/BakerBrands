import type { IFavoriteProduct } from "./favorite";

export interface IBoughtProduct extends IFavoriteProduct {
  transferDate: Date;
}
