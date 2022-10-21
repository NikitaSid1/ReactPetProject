import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../hooks/http.hook';
import './index.scss';

import { Navbar } from '../Navbar/Navbar';

export const EditProfile = () => {
  const { request } = useJWTAccess();

  const [emailProfile, setEmailProfile] = useState('');
  const [firstNameProfile, setFirstNameProfile] = useState('');
  const [lastNameProfile, setLastNameProfile] = useState('');

  useEffect(() => {
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

  const redirect = () => history.push('/profile');

  const handlerOnSubmit = async (value) => {
    try {
      await request({
        url: 'http://localhost:4040/user/profile',
        method: 'put',
        data: { firstName: value.firstNameProfile, lastName: value.lastNameProfile },
      });

      history.push('/profile');
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
      <Navbar disabled />
      <section className="container">
        <div className="editProfile-form">
          <p className="editProfile-form__text">Profile</p>

          {emailProfile && (
            <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
              <Form>
                <div className="editProfile-form__view">
                  <label className="editProfile-form__view__label" htmlFor="email">
                    Email
                  </label>
                  <Field
                    className="editProfile-form__view__input"
                    type="email"
                    id="email"
                    name="email"
                    value={emailProfile}
                    disabled
                  />

                  <label className="editProfile-form__view__label" htmlFor="firstName">
                    FirstName
                  </label>
                  <Field
                    className="editProfile-form__view__input"
                    type="text"
                    id="firstName"
                    name="firstNameProfile"
                    placeholder="First Name"
                  />

                  <label className="editProfile-form__view__label" htmlFor="lastName">
                    LastName
                  </label>
                  <Field
                    className="editProfile-form__view__input"
                    type="text"
                    id="lastName"
                    name="lastNameProfile"
                    placeholder="Last Name"
                  />
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
