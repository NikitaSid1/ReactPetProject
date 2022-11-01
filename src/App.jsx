import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import { AppRoutes } from 'routes';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { LanguageProvider } from 'services';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

export const App = () => (
  <React.StrictMode>
    <LanguageProvider>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>

      <ToastContainer />
    </LanguageProvider>
  </React.StrictMode>
);
