import { useField } from 'formik';
import * as yup from 'yup';

export const InputText = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <input className="authorisation__form__input" {...props} {...field} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export const initialValues = {
  email: '',
  password: '',
};

export const LoginSchema = yup.object({
  email: yup.string().email('Email is invalid').required(),
  password: yup
    .string()
    .min(5, 'Must be at least 5 characters')
    .max(20, 'Must be less than 20 characters')
    .required(),
});
