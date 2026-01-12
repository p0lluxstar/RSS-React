import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import * as yup from 'yup';

const useValidationSchema = () => {
  const countries = useSelector(
    (state: RootState) => state.countriesSlice.countries
  );

  return yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'The name must start with a capital letter.')
      .required('The name is required.'),
    age: yup
      .number()
      .typeError('The age is required.')
      .positive('The age must be a positive number.')
      .integer('The age must be an integer.')
      .required('The age is required.'),
    email: yup
      .string()
      .required('The email is required.')
      .email('The email must contain the "@" and the domain name.'),
    password: yup
      .string()

      .matches(
        /[A-Z]/,
        'The password must contain at least one capital letter.'
      )
      .matches(
        /[a-z]/,
        'The password must contain at least one lowercase letter.'
      )
      .matches(/[0-9]/, 'The password must contain at least one digit.')
      .matches(
        /[!@#$%^&*()_+]/,
        'The password must contain at least one special symbol.'
      )
      .min(8, 'The password must be at least 8 characters.')
      .required('The password is required.'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match.')
      .required('Confirm password is required.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select a valid gender.')
      .required('Gender is required.'),
    country: yup
      .string()
      .test(
        'is-valid-country',
        'You must select a valid country from the list.',
        function (value) {
          if (!value) return false;
          const lowerCasedCountries = countries.map((country: string) =>
            country.toLowerCase()
          );
          return lowerCasedCountries.includes(value.toLowerCase());
        }
      )
      .required('Country is required'),
    agreement: yup
      .boolean()
      .oneOf([true], 'You must accept the agreement.')
      .required('Agreement is required.'),
    file: yup.string().required('File is required.'),
  });
};

export default useValidationSchema;
