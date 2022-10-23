import { Authorizations } from '../../components/Authorizations/Authorizations';

import img from './assets/login.svg';

export const Login = () => (
  <Authorizations
    url="http://localhost:4040/login"
    formClass="authorisation__form"
    name="Login"
    redirect="Sign Up"
    img={img}
    path="/registration"
  />
);
