import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Registration, Profile, TodoList, SinglePage, ProtectedRoute } from '../pages';
import { Routes } from './constants';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const AppRoutes = () => (
  <Router>
    <Switch>
      <Route exact path={Routes.Index}>
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      </Route>

      <Route exact path={Routes.Registration}>
        <ErrorBoundary>
          <Registration />
        </ErrorBoundary>
      </Route>

      <ProtectedRoute path={Routes.Profile}>
        <Profile />
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.TodoList}>
        <ErrorBoundary>
          <TodoList />
        </ErrorBoundary>
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.getSinglePage()}>
        <ErrorBoundary>
          <SinglePage />
        </ErrorBoundary>
      </ProtectedRoute>
    </Switch>
  </Router>
);
