import * as yup from 'yup';

export const nameSchema = yup
  .object({
    name: yup
      .string()
      .required('The name is required')
      .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter'),
  })
  .required();

export const ageSchema = yup
  .object({
    age: yup.string().required('The age is required'),
  })
  .required();

export const emailSchema = yup
  .object({
    email: yup
      .string()
      .required('The email is required')
      .email('The email must contain the "@" and the domain name'),
  })
  .required();
