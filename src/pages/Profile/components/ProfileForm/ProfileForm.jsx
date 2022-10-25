import * as React from 'react';
import { Formik, Form } from 'formik';
import cn from 'classnames';

import { useJWTAccess } from '../../../../hooks/httphook';
import { View } from './View';
import { SkeletonBox } from './Skeleton';

export const ProfileForm = ({
  nameFromButton,
  editButton,
  typeFormButton = null,
  buttonExit = null,

  route = null,
  showInput = false,
  disabledInput = false,
  handlerOnSubmit = null,
}) => {
  const { request } = useJWTAccess();

  const [emailProfile, setEmailProfile] = React.useState('');
  const [firstNameProfile, setFirstNameProfile] = React.useState('');
  const [lastNameProfile, setLastNameProfile] = React.useState('');

  React.useEffect(() => {
    const dataFunction = async () => {
      const { data } = await request({
        url: 'http://localhost:4040/user/profile',
        method: 'get',
      });

      const { email, firstName, lastName } = data.entity;

      setEmailProfile(email);
      setFirstNameProfile(firstName);
      setLastNameProfile(lastName);
    };

    dataFunction();
  }, []);

  const initialValues = {
    emailProfile,
    firstNameProfile,
    lastNameProfile,
  };

  const profileButtonEdit = cn('profile-form__button', { editButton });

  return (
    <>
      {emailProfile && (
        <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
          <Form>
            <div className="profile-form__view">
              <View label="Email" name="emailProfile" disabled />

              {(firstNameProfile || !showInput) && (
                <View label="First Name" name="firstNameProfile" disabled={disabledInput} />
              )}

              {(lastNameProfile || !showInput) && (
                <View label="Last Name" name="lastNameProfile" disabled={disabledInput} />
              )}

              <button
                type={typeFormButton ? 'submit' : 'button'}
                className={profileButtonEdit}
                onClick={route}
              >
                {nameFromButton}
              </button>

              {buttonExit}
            </div>
          </Form>
        </Formik>
      )}

      {!emailProfile && SkeletonBox}
    </>
  );
};
