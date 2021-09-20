import { IReview } from '@/shared/type';

interface Props {
  review: IReview | undefined;
}

function ReviewDetailComponent({ review }: Props) {
  return (
    <div>
      <div className="rating">{review?.rating}</div>
      <h2>{review?.title}</h2>
      {review?.categories?.map((c) => (
        <small key={c.id}>{c.name}</small>
      ))}
      <p>{review?.body}</p>
    </div>
  );
}

export default ReviewDetailComponent;
