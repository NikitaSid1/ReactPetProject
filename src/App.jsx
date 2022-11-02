import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AppRoutes } from 'routes';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { LanguageProvider } from 'services';
import { Layout } from 'components/Layout';

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

export const App = () => (
  <React.StrictMode>
    <LanguageProvider>
      <ErrorBoundary>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ErrorBoundary>

      <ToastContainer />
    </LanguageProvider>
  </React.StrictMode>
);
