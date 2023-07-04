export interface IProduct {
  category: "hats" | "hoodies" | "trousers" | "tshirts";
  description: string;
  favorite: boolean;
  id: string;
  img: string;
  name: string;
  new: boolean;
  popularity: boolean;
  price: string;
  sizes: Partial<["x", "xs", "m", "l", "no_size"]>;
}
