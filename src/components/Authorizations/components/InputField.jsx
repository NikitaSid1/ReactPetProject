import { useField } from 'formik';

export const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);

  const errorCheck = meta.touched && meta.error;

  return (
    <>
      <input className="authorisation__form__input" {...props} {...field} />
      {errorCheck && <div className="authorisation__form__error">{meta.error}</div>}
    </>
  );
};
