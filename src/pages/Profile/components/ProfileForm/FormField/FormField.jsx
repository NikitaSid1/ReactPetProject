import { Field } from 'formik';

export const FormField = ({ label, name, disabled }) => (
  <>
    <label className="profile-form__view__label" htmlFor={name}>
      {label}
    </label>

    <Field
      className="profile-form__view__input"
      type="text"
      name={name}
      id={name}
      placeholder={label}
      disabled={disabled}
    />
  </>
);
