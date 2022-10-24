import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

export const App = () => (
  <React.StrictMode>
    <AppRoutes />

    <ToastContainer />
  </React.StrictMode>
);
