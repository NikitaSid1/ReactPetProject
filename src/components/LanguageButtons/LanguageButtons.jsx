import * as React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useLanguageProvider } from 'services';
import { switchLanguageLabels, LOCALES } from 'translations';

import './index.scss';

export const LanguageButtons = ({ buttonsPositionNavbar, buttonsPositionAuthorization }) => {
  const { setLanguageLocale } = useLanguageProvider();

  const languages = [
    { name: switchLanguageLabels.ENGLISH_LANGUAGE, code: LOCALES.ENGLISH },
    { name: switchLanguageLabels.UKRAINIAN_LANGUAGE, code: LOCALES.UKRAINIAN },
    { name: switchLanguageLabels.RUSSIAN_LANGUAGE, code: LOCALES.RUSSIAN },
  ];

  const sectionPositionClassName = cn('language__section', {
    'language__section-left': buttonsPositionNavbar,
  });

  const buttonsClassName = cn('language__button', {
    'language__buttons-navbar': buttonsPositionNavbar,
    'language__buttons-authorization': buttonsPositionAuthorization,
  });

  return (
    <section className={sectionPositionClassName}>
      {languages.map(({ name, code }) => (
        <button
          key={code}
          type="button"
          className={buttonsClassName}
          onClick={() => setLanguageLocale(code)}
        >
          {name}
        </button>
      ))}
    </section>
  );
};

LanguageButtons.propTypes = {
  buttonsPositionNavbar: PropTypes.bool.isRequired,
  buttonsPositionAuthorization: PropTypes.bool.isRequired,
};
