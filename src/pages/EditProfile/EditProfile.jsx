import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../hooks/httphook';
import { Navbar } from '../../components/Navbar';
import { Routes } from '../../routes/constants';

import './index.scss';

export const EditProfile = () => {
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

  const history = useHistory();

  const redirect = () => history.push(Routes.Profile);

  const handlerOnSubmit = async (value) => {
    try {
      await request({
        url: 'http://localhost:4040/user/profile',
        method: 'put',
        data: { firstName: value.firstNameProfile, lastName: value.lastNameProfile },
      });

      redirect();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
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
        <div className="editProfile-form">
          <h3 className="editProfile-form__text">Profile</h3>

          {emailProfile && (
            <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
              <Form>
                <div className="editProfile-form__view">
                  <View label="Email" name="emailProfile" disabled />

                  <View label="First Name" name="firstNameProfile" disabled={false} />

                  <View label="Last Name" name="lastNameProfile" disabled={false} />

                  <button type="submit" className="editProfile-form__edit">
                    Save
                  </button>
                </div>
              </Form>
            </Formik>
          )}

          <button type="button" className="editProfile-form__edit" onClick={redirect}>
            Exit
          </button>
        </div>
      </section>
    </>
  );
};

const View = ({ label, name, disabled }) => (
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
      disabled={disabled}
    />
  </>
);
