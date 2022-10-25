import * as React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../../../../hooks/httphook';
import { FormField } from '../FormField/FormField';
import { SkeletonBox } from '../SkeletonBox';

export const ProfileForm = ({
  formButtonName,
  isEditButton = false,
  isButtonSubmit = 'button',
  exitButton = null,
  handleButtonOnClick = null,
  isShowInput = false,
  isInputDisabled = false,
  handlerOnSubmit = null,
}) => {
  const { request } = useJWTAccess();

  const [emailProfile, setEmailProfile] = React.useState('');
  const [firstNameProfile, setFirstNameProfile] = React.useState('');
  const [lastNameProfile, setLastNameProfile] = React.useState('');

  React.useEffect(() => {
    try {
      const getProfileDate = async () => {
        const { data } = await request({
          url: 'http://localhost:4040/user/profile',
          method: 'get',
        });

        const { email, firstName, lastName } = data.entity;

        setEmailProfile(email);
        setFirstNameProfile(firstName);
        setLastNameProfile(lastName);
      };

      getProfileDate();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  }, []);

  const initialValues = {
    emailProfile,
    firstNameProfile,
    lastNameProfile,
  };

  const profileButtonEdit = cn('profile-form__button', { isEditButton });

  const inputFirstName = firstNameProfile || !isShowInput;
  const inputLastName = lastNameProfile || !isShowInput;

  return (
    <>
      {emailProfile && (
        <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
          <Form>
            <div className="profile-form__view">
              <FormField label="Email" name="emailProfile" disabled />

              {inputFirstName && (
                <FormField label="First Name" name="firstNameProfile" disabled={isInputDisabled} />
              )}

              {inputLastName && (
                <FormField label="Last Name" name="lastNameProfile" disabled={isInputDisabled} />
              )}

              <button
                type={isButtonSubmit ? 'submit' : 'button'}
                className={profileButtonEdit}
                onClick={handleButtonOnClick}
              >
                {formButtonName}
              </button>

              {exitButton}
            </div>
          </Form>
        </Formik>
      )}

      {!emailProfile && <SkeletonBox />}
    </>
  );
};

ProfileForm.propTypes = {
  formButtonName: PropTypes.string,
  isEditButton: PropTypes.bool,
  isButtonSubmit: PropTypes.string.isRequired,
  exitButton: PropTypes.element,
  handleButtonOnClick: PropTypes.func,
  isShowInput: PropTypes.bool,
  isInputDisabled: PropTypes.bool,
  handlerOnSubmit: PropTypes.func,
};
