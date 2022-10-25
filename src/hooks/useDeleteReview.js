import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useDeleteReview = () => {
  // useMutation query to createReview mutate function
  const [removeReview, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error.graphQLErrors[0]);
    },
  });

  const deleteReview = async ({ id }) => {
    // console.log('deleteReviewId', id);
    // use the createReview mutation function to add a review with useMutation which gives output { data, loading, error }
    const { data } = await removeReview({
      variables: { deleteReviewId: id },
    });
    // console.log('useDeleteReview mutate data', data);

    return data;
  };

  return [deleteReview, result];
};

export default useDeleteReview;
