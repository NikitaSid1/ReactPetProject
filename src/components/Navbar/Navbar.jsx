import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { Routes } from '../../routes/constants';

import './index.scss';

export const Navbar = ({ disabled = false }) => {
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.Index);
  };

  const navDisable = cn('navbar', { navDisable: disabled });

  return (
    <nav className={navDisable}>
      <NavLink exact to="/profile" className="navbar__link profile" activeClassName="active">
        Profile
      </NavLink>
      <NavLink exact to="/todo-list" className="navbar__link todo" activeClassName="active">
        To-Do List
      </NavLink>

      <button
        type="button"
        className="navbar__logout"
        onClick={() => {
          localStorage.removeItem('myJWT');
          redirect();
        }}
      >
        LOGOUT
      </button>
    </nav>
  );
};

Navbar.propTypes = {
  // eslint-disable-next-line
  disabled: PropTypes.bool,
};
