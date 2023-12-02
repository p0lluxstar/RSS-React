import * as yup from 'yup';

export const LoginSchema = yup
  .object({
    name: yup
      .string()
      .required('The name is required')
      .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter'),
  })
  .required();
