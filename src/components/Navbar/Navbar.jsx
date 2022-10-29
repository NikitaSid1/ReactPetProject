import { NavLink, useHistory } from 'react-router-dom';

import { Routes } from '../../routes/constants';

import './index.scss';

export const Navbar = () => {
  const history = useHistory();

  const handlerLogout = () => {
    localStorage.removeItem('myJWT');
    history.push(Routes.Index);
  };

  return (
    <nav className="navbar">
      <NavLink
        exact
        to={Routes.Profile}
        className="navbar__link navbar__profile-link"
        activeClassName="active"
      >
        Profile
      </NavLink>
      <NavLink exact to={Routes.TodoList} className="navbar__link" activeClassName="active">
        To-Do List
      </NavLink>

      <button type="button" className="navbar__logout" onClick={handlerLogout}>
        LOGOUT
      </button>
    </nav>
  );
};
