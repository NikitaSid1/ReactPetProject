import { useIntl } from 'react-intl';

import { Authorizations } from 'components/Authorizations';
import { Routes } from 'routes/constants';

import signUpImg from './assets/signUp.svg';

export const Registration = () => {
  const { formatMessage } = useIntl();

  return (
    <Authorizations
      requestUrl="/signup"
      pageNameLabel={formatMessage({ id: 'authorization_signup' })}
      switchPageBtnLabel={formatMessage({ id: 'authorization_login' })}
      pageBackgroundImg={signUpImg}
      switchPageBtnRoute={Routes.Index}
      formClassName="authorisation__form authorisation__reverse"
    />
  );
};
