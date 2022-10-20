import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import { Login } from './components/Authorizations/Login';
import { Registration } from './components/Authorizations/Registration';
import { EditProfile } from './components/EditProfile';
import { Profile } from './components/Profile';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SinglePage } from './components/SinglePage';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
