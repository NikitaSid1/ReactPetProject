import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { requestTodo } from 'services';
import { Routes } from 'routes/constants';
import { ProfileForm } from '../ProfileForm';

export const FormEdit = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const { formatMessage } = useIntl();

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
      toast.error(formatMessage({ id: 'toast_error' }));
    } finally {
      setIsLoading(false);
    }
  };

  const exitButton = (
    <button type="button" className="profile-form__button" onClick={redirect} disabled={isLoading}>
      {formatMessage({ id: 'profile_button_cancel' })}
    </button>
  );

  return (
    <ProfileForm
      formButtonName={formatMessage({ id: 'profile_button_save' })}
      isSubmitButton
      isDisabledSubmitButton={isLoading}
      exitButton={exitButton}
      isInputDisabled={false}
      handlerOnSubmit={handlerOnSubmit}
    />
  );
};
