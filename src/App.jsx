import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.scss';

import {
  EditProfile,
  Login,
  Registration,
  Profile,
  ProtectedRoute,
  SinglePage,
  TodoList,
} from './pages';

export const App = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration />
        </Route>
        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute exact path="/profile/edit">
          <EditProfile />
        </ProtectedRoute>

        <ProtectedRoute exact path="/todo-list">
          <TodoList />
        </ProtectedRoute>

        <ProtectedRoute exact path="/todo-list/:id">
          <SinglePage />
        </ProtectedRoute>
      </Switch>
    </Router>

    <ToastContainer />
  </>
);
