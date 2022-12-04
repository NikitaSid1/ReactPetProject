import * as React from 'react';
import { useIntl } from 'react-intl';

import { Authorizations } from 'components/Authorizations';
import { Routes } from 'routes/constants';

import loginImg from './assets/login.svg';

export const Login = () => {
  const { formatMessage } = useIntl();

  return (
    <Authorizations
      requestUrl="/login"
      pageBackgroundImg={loginImg}
      switchPageBtnRoute={Routes.Registration}
      formClassName="authorisation__form"
      pageNameLabel={formatMessage({ id: 'authorization_login' })}
      switchPageBtnLabel={formatMessage({ id: 'authorization_signup' })}
      toastSuccessfulAuthorizationMessage={formatMessage({ id: 'toast_success_login' })}
    />
  );
};
