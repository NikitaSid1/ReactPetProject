import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Routes } from 'routes/constants';
import { LanguageButtons } from 'components/LanguageButtons';

import './index.scss';

export const Navbar = () => {
  const history = useHistory();

  const { formatMessage } = useIntl();

  const handlerLogout = () => {
    localStorage.removeItem('myJWT');
    history.push(Routes.Index);
  };

  return (
    <nav className="navbar">
      <LanguageButtons buttonsPositionNavbar buttonsPositionAuthorization={false} />
      <NavLink
        exact
        to={Routes.Profile}
        className="navbar__link navbar__profile-link"
        activeClassName="active"
      >
        {formatMessage({ id: 'navbar_link_profile' })}
      </NavLink>
      <NavLink
        exact
        to={Routes.TodoList}
        className="navbar__link  navbar__todo-link"
        activeClassName="active"
      >
        {formatMessage({ id: 'navbar_link_todo' })}
      </NavLink>

      <button type="button" className="navbar__logout" onClick={handlerLogout}>
        {formatMessage({ id: 'navbar_button_logout' })}
      </button>
    </nav>
  );
};
