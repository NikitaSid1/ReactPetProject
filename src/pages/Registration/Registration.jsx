import { Authorizations } from 'components/Authorizations';
import { Routes } from 'routes/constants';

import signUpImg from './assets/signUp.svg';

export const Registration = () => (
  <Authorizations
    requestUrl="/signup"
    pageNameLabel="Sign Up"
    switchPageBtnLabel="Login"
    pageBackgroundImg={signUpImg}
    switchPageBtnRoute={Routes.Index}
    formClassName="authorisation__form authorisation__reverse"
  />
);
