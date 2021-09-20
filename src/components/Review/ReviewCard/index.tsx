import { IReview } from '@/shared/type';
import Link from 'next/link';

interface Props {
  review: IReview | undefined;
}

function ReviewCardComponent({ review }: Props) {
  return (
    <div>
      <div className="rating">{review?.rating}</div>
      <h2>{review?.title}</h2>
      {review?.categories?.map((c) => (
        <small key={c.id}>{c.name}</small>
      ))}
      <p>{review?.body.substring(0, 100)}</p>
      <Link
        href={{
          pathname: '/details/[id]',
          query: { id: review?.id },
        }}
      >
        <a>Read More</a>
      </Link>
    </div>
  );
}

export default ReviewCardComponent;
