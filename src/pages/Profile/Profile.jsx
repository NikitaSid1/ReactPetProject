import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';

import { useJWTAccess } from '../../hooks/httphook';
import { Navbar } from '../../components/Navbar';
import { Routes } from '../../routes/constants';

import './index.scss';

export const Profile = () => {
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
      setLastNameProfile(lastName);
      setFirstNameProfile(firstName);
    };

    dataFunction();
  }, []);

  const history = useHistory();

  const redirect = () => {
    history.push(Routes.ProfileEdit);
  };

  const initialValues = {
    emailProfile,
    firstNameProfile,
    lastNameProfile,
  };

  return (
    <>
      <Navbar />
      <section className="container">
        <div className="profile-form">
          <h3 className="profile-form__text">Profile</h3>

          {emailProfile && (
            <Formik initialValues={initialValues}>
              <Form>
                <div className="profile-form__view">
                  <View label="Email" name="emailProfile" />

                  {firstNameProfile && <View label="First Name" name="firstNameProfile" />}

                  {lastNameProfile && <View label="Last Name" name="lastNameProfile" />}

                  <button type="button" className="profile-form__edit-btn" onClick={redirect}>
                    Edit
                  </button>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      </section>
    </>
  );
};

const View = ({ label, name }) => (
  <>
    <label className="editProfile-form__view__label" htmlFor={name}>
      {label}
    </label>

    <Field
      className="editProfile-form__view__input"
      type="text"
      name={name}
      id={name}
      placeholder={label}
      disabled
    />
  </>
);
