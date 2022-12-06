import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Routes } from 'routes/constants';
import { ProfileForm } from '../ProfileForm';

export const FormView = () => {
  const history = useHistory();

  const { formatMessage } = useIntl();

  const redirect = () => {
    history.push(Routes.ProfileEdit);
  };

  return (
    <ProfileForm
      formButtonName={formatMessage({ id: 'profile_button_edit' })}
      isSubmitButton={false}
      isEditButton
      handleButtonOnClick={redirect}
      isShowInput
      isInputDisabled
    />
  );
};
