import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Routes } from 'routes/constants';
import { requestTodo } from 'services';
import { ProfileForm } from '../ProfileForm';

export const FormEdit = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.Profile);
  };

  const handlerOnSubmit = async ({ firstNameProfile, lastNameProfile }) => {
    setIsLoading(true);
    try {
      await requestTodo({
        url: '/user/profile',
        method: 'put',
        data: { firstName: firstNameProfile, lastName: lastNameProfile },
      });

      redirect();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  const exitButton = (
    <button type="button" className="profile-form__button" onClick={redirect} disabled={isLoading}>
      Cancel
    </button>
  );

  return (
    <ProfileForm
      formButtonName="Save"
      isSubmitButton
      isDisabledSubmitButton={isLoading}
      exitButton={exitButton}
      isInputDisabled={false}
      handlerOnSubmit={handlerOnSubmit}
    />
  );
};
