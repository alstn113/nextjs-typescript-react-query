import { ICategory } from '@/shared/type';
import client from '@/utils/axios';

export const getCategories = async (): Promise<ICategory[]> => {
  const { data } = await client.get(`/categories`);
  return data;
};

export const getCategoryById = async (id: string | string[] | undefined): Promise<ICategory> => {
  const { data } = await client.get(`/categories/${id}`);
  return data;
};
