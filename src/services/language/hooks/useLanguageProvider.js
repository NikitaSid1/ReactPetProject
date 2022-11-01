import * as React from 'react';

import { LanguageContext } from '../LanguageProvider';

export const useLanguageProvider = () => React.useContext(LanguageContext);
