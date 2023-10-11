export interface IProduct {
  category: "hats" | "hoodies" | "trousers" | "tshirts";
  description: string;
  id: string;
  images: string[];
  img: string;
  inStock: number;
  name: string;
  new: boolean;
  popularity: boolean;
  price: number;
  rating: IRating;
  reviews: IReview[];
  sizes: Partial<["x", "xs", "m", "l", "no_size"]>;
}

export interface IRating {
  rating: number;
  ratings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

export interface IReview {
  comment: string;
  images: string[];
  rating: number;
}
