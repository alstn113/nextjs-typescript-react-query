import { getCategories } from '@/api/category';
import { ICategory } from '@/shared/type';
import Link from 'next/link';
import { useQuery, UseQueryResult } from 'react-query';

function HeaderComponent() {
  const { data, isLoading, isError, error }: UseQueryResult<ICategory[], Error> = useQuery<
    ICategory[],
    Error
  >('categories', getCategories);
  return (
    <>
      <div>
        <div>
          <Link href="/">
            <a>Minsoo Reviews</a>
          </Link>
        </div>
        <nav>
          <span>Filter reviews by categories : </span>
          {isLoading
            ? `Loading...`
            : isError && error
            ? `Error ${error.message}`
            : data?.map((category) => (
                <Link
                  key={category.id}
                  href={{
                    pathname: '/category/[id]',
                    query: { id: category.id },
                  }}
                >
                  <a>{category.name}</a>
                </Link>
              ))}
        </nav>
      </div>
    </>
  );
}

export default HeaderComponent;
