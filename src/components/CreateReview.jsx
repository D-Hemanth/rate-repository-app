import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import Button from './Button';
import Text from './Text';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const styles = StyleSheet.create({
  button: {
    margin: 15,
    backgroundColor: theme.button.backgroundPinkColor,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository Owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be greater than or equal to 0')
    .max(100, 'Rating must be less than or equal to 100')
    .required('Rating is required'),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Button onPress={onSubmit} style={styles.button}>
        <Text fontSize="subheading" fontWeight="bold">
          Create a review
        </Text>
      </Button>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  // call the useCreateReview component with useMutation to get the addReview mutate function query
  const [addReview] = useCreateReview();

  const onSubmit = async (values) => {
    // destructure the values you get from formikInput form
    const { ownerName, repositoryName, rating, text } = values;

    try {
      // use the createReview mutation function to add a review with useMutation which gives output { data, loading, error }
      const addedReview = await addReview({
        ownerName,
        repositoryName,
        rating,
        text,
      });
      console.log('CreateReview mutate data', addedReview);

      // on successful createReview redirect user to Single repository homepage with reivew you just added
      navigate(`/${addedReview.createReview.repositoryId}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
