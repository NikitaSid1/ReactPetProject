import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRoutes } from './routes';
import { ErrorBoundary } from './components/ErrorBoundary';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

export const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>

    <ToastContainer />
  </React.StrictMode>
);
