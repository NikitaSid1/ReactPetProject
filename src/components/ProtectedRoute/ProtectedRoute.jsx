import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ children, ...rest }) => {
  const jwtToken = localStorage.getItem('myJWT');

  return <Route {...rest} render={() => (jwtToken ? children : <Redirect to="/" />)} />;
};
