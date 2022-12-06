import * as React from 'react';
import PropTypes from 'prop-types';
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

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};
