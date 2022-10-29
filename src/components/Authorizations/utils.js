import * as yup from 'yup';

export const LoginSchema = yup.object({
  email: yup.string().email('Email is invalid').required(),
  password: yup
    .string()
    .min(5, 'Must be at least 5 characters')
    .max(20, 'Must be less than 20 characters')
    .required(),
});
