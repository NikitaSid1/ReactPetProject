import { LOCALES } from './locales';

import enLanguage from './en-US/en-US.json';
import uaLanguage from './uk-UA/uk-UA.json';
import ruLanguage from './ru-RU/ru-RU.json';

export const messages = {
  [LOCALES.ENGLISH]: enLanguage,
  [LOCALES.UKRAINIAN]: uaLanguage,
  [LOCALES.RUSSIAN]: ruLanguage,
};
