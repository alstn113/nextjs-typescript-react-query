import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div>
      <h1>NOT FOUND</h1>
      <h3>
        <Link href="/">
          <a>GO TO HOME</a>
        </Link>
      </h3>
    </div>
  );
};

export default NotFoundPage;
