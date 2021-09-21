import { IReview } from '@/shared/type';
import client from '@/utils/axios';

export const getReviews = async (): Promise<IReview[]> => {
  const { data } = await client.get(`/reviews`);
  return data;
};

export const getReviewById = async (id: string | string[] | undefined): Promise<IReview> => {
  const { data } = await client.get(`/reviews/${id}`);
  return data;
};

export const createReview = async (
  title: string,
  body: string,
  rating: number,
): Promise<IReview> => {
  const { data } = await client.post('/reviews', { title, body, rating });
  return data;
};
