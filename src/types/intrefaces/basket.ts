import type { IProduct } from "./product";

export interface IBasketProduct {
  count: number;
  id: string;
  sizes: string[];
}

export type IBasketProductData = IBasketProduct & IProduct;
