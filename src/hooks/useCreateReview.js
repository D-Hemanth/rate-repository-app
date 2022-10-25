import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  // useMutation query to createReview mutate function
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0]);
    },
  });

  const addReview = async ({ ownerName, repositoryName, rating, text }) => {
    // use the createReview mutation function to add a review with useMutation which gives output { data, loading, error }
    const { data } = await createReview({
      variables: { ownerName, repositoryName, rating: Number(rating), text },
    });
    // console.log('useCreateReview mutate data', data);

    return data;
  };

  return [addReview, result];
};

export default useCreateReview;
