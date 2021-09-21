import { useRouter } from 'next/router';
import { dehydrate, DehydratedState, QueryClient, useQuery, UseQueryResult } from 'react-query';
import {
  GetStaticPaths,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';

import { getReviewById, getReviews } from '@/api/review';
import { getCategories } from '@/api/category';
import { IReview } from '@/shared/type';
import ReviewDetailComponent from '@/components/Review/ReviewDetail';

function ReviewDetailPage() {
  const id = useRouter().query.id as string;
  const {
    data: review,
    isLoading,
    isError,
    error,
  }: UseQueryResult<IReview, Error> = useQuery<IReview, Error>(['review', id], () =>
    getReviewById(id),
  );
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;
  return (
    <>
      <ReviewDetailComponent review={review} />
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
  await queryClient.prefetchQuery(['review', id], () => getReviewById(id));
  await queryClient.prefetchQuery('categories', getCategories);
  const data = queryClient.getQueryData(['review', id]);

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
  const data = await getReviews();
  const paths = data.map((review) => {
    return {
      params: {
        id: review.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export default ReviewDetailPage;
