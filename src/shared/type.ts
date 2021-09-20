export interface IReview {
  id: number;
  title: string;
  body: string;
  rating: number;
  categories?: ICategory[];
}

export interface ICategory {
  id: number;
  name: string;
  reviews: IReview[];
}
