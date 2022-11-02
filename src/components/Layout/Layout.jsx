import { useLocation } from 'react-router-dom';

import { Navbar } from './components';

export const Layout = ({ children }) => {
  const { pathname } = useLocation();

  if (pathname === '/' || pathname === '/registration') {
    return children;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
