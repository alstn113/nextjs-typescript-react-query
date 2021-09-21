import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IReview } from '@/shared/type';
import { useMutation, UseMutationResult } from 'react-query';
import { createReview } from '@/api/review';
import { useRouter } from 'next/router';

interface IFormInputs {
  title: string;
  body: string;
  rating: number;
}

const schema = yup.object().shape({
  title: yup.string().required('필수 항목입니다'),
  body: yup.string().required('필수 항목입니다'),
  rating: yup
    .number()
    .integer('정수를 입력해주세요')
    .min(1, '1~10 사이의 수를 입력해주세요')
    .max(10, '1~10 사이의 수를 입력해주세요')
    .required('필수 항목입니다.'),
});

function CreateReviewPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const mutation: UseMutationResult<IReview, Error, IFormInputs> = useMutation<
    IReview,
    Error,
    IFormInputs
  >('createReview', ({ title, body, rating }) => createReview(title, body, rating), {
    onSuccess: () => {
      return router.push('/');
    },
  });

  const onSubmit = ({ title, body, rating }: IFormInputs) => {
    mutation.mutate({ title, body, rating });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <input {...register('title')} />
      <p>{errors.title?.message}</p>

      <textarea {...register('body')} />
      <p>{errors.body?.message}</p>

      <input {...register('rating')} type="number" defaultValue="5" />
      <p>{errors.rating?.message}</p>

      <button type="submit">{mutation.isLoading ? 'Loading...' : 'Submit'}</button>
    </form>
  );
}

export default CreateReviewPage;
