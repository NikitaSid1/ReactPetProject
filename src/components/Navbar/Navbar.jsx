import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.scss';

export const Navbar = ({ disabled }) => {
  const history = useHistory();

  const redirect = () => {
    history.push('/');
  };

  return (
    <nav className="navbar" style={disabled ? { pointerEvents: 'none', opacity: '0.4' } : {}}>
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
