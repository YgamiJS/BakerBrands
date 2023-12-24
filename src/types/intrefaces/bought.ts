import type { IBasketProduct } from "./basket";
import type { IProduct } from "./product";

import { deliveryOrganizations } from "../enums/deliveryOrganizations";

export type IBoughtProduct = IBasketProduct;

export type IBoughtProductData = IProduct & IBasketProduct;

export interface IOrder {
  boughtProducts: IBoughtProduct[];
  deliveryOrganization: deliveryOrganizations;
  id: string;
  startDate: string;
  transferDate: string;
}

export interface IOrderData {
  boughtProducts: IBoughtProductData[];
  deliveryOrganization: deliveryOrganizations;
  id: string;
  startDate: string;
  transferDate: string;
}
