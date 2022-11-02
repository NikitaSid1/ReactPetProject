import { Navbar } from './components';

export const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
