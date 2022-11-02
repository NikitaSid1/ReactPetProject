import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login, Registration, Profile, TodoList, SinglePage, ProtectedRoute } from 'pages';
import { Layout } from 'components/Layout';
import { Routes } from './constants';

export const AppRoutes = () => (
  <Router>
    <Switch>
      <Route exact path={Routes.Index}>
        <Login />
      </Route>

      <Route exact path={Routes.Registration}>
        <Registration />
      </Route>

      <ProtectedRoute path={Routes.Profile}>
        <Layout>
          <Profile />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.TodoList}>
        <Layout>
          <TodoList />
        </Layout>
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.getSinglePage()}>
        <Layout>
          <SinglePage />
        </Layout>
      </ProtectedRoute>
    </Switch>
  </Router>
);
