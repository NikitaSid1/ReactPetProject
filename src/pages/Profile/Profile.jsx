import React from 'react';
import { useHistory } from 'react-router-dom';

import { useJWTAccess } from '../../hooks/http.hook';
import { Navbar } from '../Navbar';

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
    history.push('/profile/edit');
  };

  return (
    <>
      <Navbar />
      <section className="container">
        <div className="profile-form">
          <p className="profile-form__text">Profile</p>
          <div className="profile-form__view">
            <View label="Email" name="email" placeholder={emailProfile} />
            {firstNameProfile && (
              <View label="FirstName" name="firstName" placeholder={firstNameProfile} />
            )}
            {lastNameProfile && (
              <View label="LastName" name="lastName" placeholder={lastNameProfile} />
            )}
            <button type="button" className="profile-form__edit-btn" onClick={() => redirect()}>
              Edit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

const View = ({ label, name, placeholder, disabled = true }) => (
  <>
    <label className="profile-form__view__label" htmlFor={name}>
      {label}
    </label>
    <input
      className="profile-form__view__input"
      type="text"
      name={name}
      placeholder={placeholder}
      disabled={disabled}
    />
  </>
);
