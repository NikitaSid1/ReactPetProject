import * as React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../../../hooks/httphook';
import { FormField } from '../FormField';
import { SkeletonField } from '../SkeletonField';

export const ProfileForm = ({
  formButtonName,
  isSubmitButton,
  isInputDisabled,
  exitButton = null,
  isEditButton = false,
  isShowInput = false,
  handleButtonOnClick = () => {},
  handlerOnSubmit = () => {},
}) => {
  const { request } = useJWTAccess();

  const [emailProfile, setEmailProfile] = React.useState('');
  const [firstNameProfile, setFirstNameProfile] = React.useState('');
  const [lastNameProfile, setLastNameProfile] = React.useState('');

  React.useEffect(() => {
    const getProfileDate = async () => {
      try {
        const { data } = await request({
          url: 'http://localhost:4040/user/profile',
          method: 'get',
        });

        const { email, firstName, lastName } = data.entity;

        setEmailProfile(email);
        setFirstNameProfile(firstName);
        setLastNameProfile(lastName);
      } catch (e) {
        toast.error('Something Went Wrong 😢 \nPlease Try Again');
      }
    };

    getProfileDate();
  }, []);

  const initialValues = {
    emailProfile,
    firstNameProfile,
    lastNameProfile,
  };

  const editBtnClassName = cn('profile-form__button', { isEditButton });

  const isInputFirstName = firstNameProfile || !isShowInput;
  const isInputLastName = lastNameProfile || !isShowInput;

  return (
    <>
      {emailProfile && (
        <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
          <Form>
            <div className="profile-form__view">
              <FormField label="Email" name="emailProfile" disabled />

              {isInputFirstName && (
                <FormField label="First Name" name="firstNameProfile" disabled={isInputDisabled} />
              )}

              {isInputLastName && (
                <FormField label="Last Name" name="lastNameProfile" disabled={isInputDisabled} />
              )}

              <button
                type={isSubmitButton ? 'submit' : 'button'}
                className={editBtnClassName}
                onClick={handleButtonOnClick}
              >
                {formButtonName}
              </button>

              {exitButton}
            </div>
          </Form>
        </Formik>
      )}

      {!emailProfile && <SkeletonField />}
    </>
  );
};

ProfileForm.propTypes = {
  formButtonName: PropTypes.string.isRequired,
  isSubmitButton: PropTypes.bool.isRequired,
  isInputDisabled: PropTypes.bool.isRequired,
  exitButton: PropTypes.element,
  isEditButton: PropTypes.bool,
  isShowInput: PropTypes.bool,
  handleButtonOnClick: PropTypes.func,
  handlerOnSubmit: PropTypes.func,
};
