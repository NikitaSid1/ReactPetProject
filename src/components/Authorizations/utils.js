import * as yup from 'yup';

export const createValidationSchema = (t) =>
  yup.object({
    email: yup
      .string()
      .email(t({ id: 'authorization_email_is_invalid' }))
      .required(t({ id: 'authorization_email_error' })),
    password: yup
      .string()
      .min(5, t({ id: 'authorization_password_less_five_char' }))
      .max(20, t({ id: 'authorization_password_more_twenty_char' }))
      .required(t({ id: 'authorization_password_error' })),
  });
