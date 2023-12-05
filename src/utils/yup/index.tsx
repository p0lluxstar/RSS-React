import * as yup from 'yup';

export const nameSchema = yup
  .object({
    name: yup
      .string()
      .required('The name is required.')
      .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter.'),
  })
  .required();

export const ageSchema = yup
  .object({
    age: yup.string().required('The age is required.'),
  })
  .required();

export const emailSchema = yup
  .object({
    email: yup
      .string()
      .required('The email is required.')
      .email('The email must contain the "@" and the domain name.'),
  })
  .required();

export const passwordSchema = yup
  .object({
    password: yup
      .string()
      .min(8, 'The password be at least min 8 characters.')
      .matches(/[A-Z]/, 'The password be at least one capital letter.')
      .matches(/[a-z]/, 'The password be at least one lowercase letter.')
      .matches(/[0-9]/, 'The password be at least one digit.')
      .matches(/[`!@#$%^&*()_+]/, 'The password be at least one spin symbol.'),
  })
  .required();

export const loginSchema = yup
  .object({
    name: yup
      .string()
      .required('The name is required.')
      .matches(/^[A-ZА-Я]/, 'The name must begin with a capital letter.'),
    age: yup.string().required('The age is required.'),
    email: yup
      .string()
      .required('The email is required.')
      .email('The email must contain the "@" and the domain name.'),
    password: yup
      .string()

      .min(8, 'The password be at least min 8 characters.')
      .matches(/[A-Z]/, 'The password be at least one capital letter.')
      .matches(/[a-z]/, 'The password be at least one lowercase letter.')
      .matches(/[0-9]/, 'The password be at least one digit.')
      .matches(/[`!@#$%^&*()_+]/, 'The password be at least one spin symbol.')
      .required('The password is required.'),
  })
  .required();
