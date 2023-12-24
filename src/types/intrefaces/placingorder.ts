import { deliveryOrganizations } from "../enums/deliveryOrganizations";

export interface IPlacingOrder {
  id: string;
  sum: number;
}

export interface IDeliveryMethod {
  id: string;
  img: string;
  name: deliveryOrganizations;
}
