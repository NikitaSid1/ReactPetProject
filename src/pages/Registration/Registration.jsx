import { Authorizations } from '../../components/Authorizations/Authorizations';

import signUpImg from './assets/signUp.svg';

export const Registration = () => (
  <Authorizations
    url="http://localhost:4040/signup"
    formClass="authorisation__form reverse"
    name="Sign Up"
    redirect="Login"
    img={signUpImg}
    path="/"
  />
);
