import { useRouter } from 'next/router';
import { dehydrate, DehydratedState, QueryClient, useQuery, UseQueryResult } from 'react-query';
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { getCategories, getCategoryById } from '@/api/category';
import { ICategory } from '@/shared/type';
import ReviewCardComponent from '@/components/Review/ReviewCard';

function CategoryPage() {
  const id = useRouter().query.id as string;
  const { data, isLoading, isError, error }: UseQueryResult<ICategory, Error> = useQuery<
    ICategory,
    Error
  >(['category', id], () => getCategoryById(id));
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;
  return (
    <>
      {data?.reviews?.map((review) => (
        <div key={review?.id}>
          <ReviewCardComponent review={review} />
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
): Promise<
  GetStaticPropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const id = context?.params?.id as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['category', id], () => getCategoryById(id));
  await queryClient.prefetchQuery('categories', getCategories);
  const data = queryClient.getQueryData(['category', id]);

  if (!data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 1 };
};

export const getStaticPaths: GetStaticPaths = async (): Promise<
  GetStaticPathsResult<{ id: string }>
> => {
  const data = await getCategories();
  const paths = data.map((category) => {
    return {
      params: {
        id: category.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export default CategoryPage;
