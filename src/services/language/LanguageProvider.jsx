import * as React from 'react';
import { IntlProvider } from 'react-intl';

import { LOCALES } from 'i18n/locales';
import { messages } from 'i18n/messages';

export const LanguageContext = React.createContext({
  languageLocale: LOCALES.ENGLISH,
  setLanguageLocale: () => {},
});

export const LanguageProvider = ({ children }) => {
  const [languageLocale, setLanguageLocale] = React.useState(LOCALES.ENGLISH);
  const languageProviderData = React.useMemo(
    () => ({
      languageLocale,
      setLanguageLocale,
    }),
    [],
  );

  return (
    <LanguageContext.Provider value={languageProviderData}>
      <IntlProvider
        locale={languageLocale}
        defaultLocale={LOCALES.ENGLISH}
        messages={messages[languageLocale]}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};
