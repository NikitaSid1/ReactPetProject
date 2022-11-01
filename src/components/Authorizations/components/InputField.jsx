import { useField } from 'formik';

export const InputField = ({ ...props }) => {
  const [field, meta] = useField(props);

  const isError = meta.touched && meta.error;

  return (
    <section className="authorisation__form__input-block">
      <label className="authorisation__form__label" htmlFor={props.name}>
        {props.placeholder}
      </label>
      <input className="authorisation__form__input" {...props} {...field} />
      {isError && <div className="authorisation__form__error">{meta.error}</div>}
    </section>
  );
};
