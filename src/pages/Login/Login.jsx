import { Authorizations } from '../../components/Authorizations/Authorizations';
import { Routes } from '../../routes/constants';

import loginImg from './assets/login.svg';

export const Login = () => (
  <Authorizations
    requestUrl="http://localhost:4040/login"
    pageNameLabel="Login"
    switchPageBtnLabel="Sign Up"
    pageBackgroundImg={loginImg}
    switchPageBtnRoute={Routes.Registration}
    formClassName="authorisation__form"
  />
);
