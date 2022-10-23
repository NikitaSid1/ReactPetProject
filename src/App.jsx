import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppRoutes } from './routes';

import './index.scss';

export const App = () => (
  <React.StrictMode>
    <AppRoutes />

    <ToastContainer />
  </React.StrictMode>
);
