import { Authorizations } from 'components/Authorizations';
import { Routes } from 'routes/constants';

import loginImg from './assets/login.svg';

export const Login = () => (
  <Authorizations
    requestUrl="/login"
    pageNameLabel="Login"
    switchPageBtnLabel="Sign Up"
    pageBackgroundImg={loginImg}
    switchPageBtnRoute={Routes.Registration}
    formClassName="authorisation__form"
  />
);
