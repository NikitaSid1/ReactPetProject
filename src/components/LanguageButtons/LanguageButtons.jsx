import PropTypes from 'prop-types';
import cn from 'classnames';

import { useLanguageProvider } from 'services';
import { LOCALES } from 'i18n/locales';

import './index.scss';

export const LanguageButtons = ({ buttonsPositionNavbar, buttonsPositionAuthorization }) => {
  const { setLanguageLocale } = useLanguageProvider();

  const languages = [
    { name: 'English', code: LOCALES.ENGLISH },
    { name: 'Українська', code: LOCALES.UKRAINIAN },
    { name: 'Русский', code: LOCALES.RUSSIAN },
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
