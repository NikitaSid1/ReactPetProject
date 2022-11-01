import * as React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { useLanguageProvider } from 'services';
import { Routes } from 'routes/constants';
import { LOCALES } from 'i18n/locales';

import './index.scss';

export const Navbar = () => {
  const { formatMessage } = useIntl();
  const { setLanguageLocale } = useLanguageProvider();

  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Ukrainian', code: LOCALES.UKRAINIAN },
    { name: 'Russian', code: LOCALES.RUSSIAN },
  ];

  const history = useHistory();

  const handlerLogout = () => {
    localStorage.removeItem('myJWT');
    history.push(Routes.Index);
  };

  return (
    <nav className="navbar">
      <section className="navbar__section-buttons">
        {languages.map(({ name, code }) => (
          <button
            key={code}
            type="button"
            className="navbar__button-language"
            onClick={() => setLanguageLocale(code)}
          >
            {name}
          </button>
        ))}
      </section>

      <NavLink
        exact
        to={Routes.Profile}
        className="navbar__link navbar__profile-link"
        activeClassName="active"
      >
        {formatMessage({ id: 'navbar_link_profile' })}
      </NavLink>
      <NavLink exact to={Routes.TodoList} className="navbar__link" activeClassName="active">
        {formatMessage({ id: 'navbar_link_todo' })}
      </NavLink>

      <button type="button" className="navbar__logout" onClick={handlerLogout}>
        {formatMessage({ id: 'navbar_button_logout' })}
      </button>
    </nav>
  );
};
