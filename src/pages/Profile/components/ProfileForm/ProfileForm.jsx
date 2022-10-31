import * as React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';

import { requestTodo } from 'services';
import { FormSkeleton } from '../FormSkeleton';
import { FormField } from '../FormField';

export const ProfileForm = ({
  isDisabledSubmitButton = false,
  formButtonName,
  isSubmitButton,
  isInputDisabled,
  exitButton = null,
  isEditButton = false,
  isShowInput = false,
  handleButtonOnClick = () => {},
  handlerOnSubmit = () => {},
}) => {
  const [emailProfile, setEmailProfile] = React.useState('');
  const [firstNameProfile, setFirstNameProfile] = React.useState('');
  const [lastNameProfile, setLastNameProfile] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getProfileDate = async () => {
      setIsLoading(true);
      try {
        const { data } = await requestTodo({
          url: '/user/profile',
        });

        const { email, firstName, lastName } = data.entity;

        setEmailProfile(email);
        setFirstNameProfile(firstName);
        setLastNameProfile(lastName);
      } catch (e) {
        toast.error('Something Went Wrong 😢 \nPlease Try Again');
      } finally {
        setIsLoading(false);
      }
    };

    getProfileDate();
  }, []);

  const initialValues = {
    emailProfile,
    firstNameProfile,
    lastNameProfile,
  };

  const editBtnClassName = cn('profile-form__button', {
    'profile-form__isEdit__button': isEditButton,
  });

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
                onClick={handleButtonOnClick}
                className={editBtnClassName || isLoading}
                disabled={isDisabledSubmitButton}
              >
                {formButtonName}
              </button>

              {exitButton}
            </div>
          </Form>
        </Formik>
      )}

      {!emailProfile && <FormSkeleton />}
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
