import * as React from 'react';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Router, Switch } from 'react-router-dom';

import { LanguageProvider } from 'services';

export const renderWithLanguage = (children) =>
  render(<LanguageProvider>{children}</LanguageProvider>);

export const renderWithRouter = (
  children,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  view: renderWithLanguage(
    <Router history={history}>
      <Switch>{children}</Switch>
    </Router>,
  ),
  history,
});
