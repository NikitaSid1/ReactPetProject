import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import {
  Login,
  Registration,
  Profile,
  EditProfile,
  TodoList,
  SinglePage,
  ProtectedRoute,
} from '../pages';

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

      <ProtectedRoute exact path={Routes.Profile}>
        <Profile />
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.ProfileEdit}>
        <EditProfile />
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.TodoList}>
        <TodoList />
      </ProtectedRoute>

      <ProtectedRoute exact path={Routes.getSinglePage()}>
        <SinglePage />
      </ProtectedRoute>
    </Switch>
  </Router>
);