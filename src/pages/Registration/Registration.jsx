import { Authorizations } from '../../components/Authorizations/Authorizations';
import { Routes } from '../../routes/constants';

import signUpImg from './assets/signUp.svg';

export const Registration = () => (
  <Authorizations
    requestUrl="http://localhost:4040/signup"
    pageNameLabel="Sign Up"
    switchPageBtnLabel="Login"
    pageBackgroundImg={signUpImg}
    switchPageBtnRoute={Routes.Index}
    formClassName="authorisation__form reverse"
  />
);
