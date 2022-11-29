import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { Navbar } from './components';

export const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const login = '/';
  const registration = '/registration';

  if (pathname === login || pathname === registration) {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
