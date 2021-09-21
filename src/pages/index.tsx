import { dehydrate, DehydratedState, QueryClient, useQuery, UseQueryResult } from 'react-query';
import { GetStaticProps, GetStaticPropsResult } from 'next';

import { getReviews } from '@/api/review';
import { getCategories } from '@/api/category';
import type { IReview } from '@/shared/type';
import ReviewCardComponent from '@/components/Review/ReviewCard';

function HomePage() {
  const { data, isLoading, isError, error }: UseQueryResult<IReview[], Error> = useQuery<
    IReview[],
    Error
  >('reviews', getReviews);
  if (isLoading) return <p>Loading...</p>;
  if (isError && error) return <p>Error {error.message}</p>;

  return (
    <>
      {data?.map((review) => (
        <div key={review?.id}>
          <ReviewCardComponent review={review} />
        </div>
      ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<{
    dehydratedState: DehydratedState;
  }>
> => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('reviews', getReviews);
  await queryClient.prefetchQuery('categories', getCategories);
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 1 };
};

export default HomePage;
