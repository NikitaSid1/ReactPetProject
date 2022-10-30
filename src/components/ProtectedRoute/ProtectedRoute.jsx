import { Redirect, Route } from 'react-router-dom';
import { Routes } from 'routes/constants';

export const ProtectedRoute = ({ children, ...rest }) => {
  const jwtToken = localStorage.getItem('myJWT');

  return <Route {...rest} render={() => (jwtToken ? children : <Redirect to={Routes.Index} />)} />;
};
