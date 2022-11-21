import * as React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Switch } from 'react-router-dom';

import { LanguageProvider } from 'services';
import { Layout } from './Layout';

describe('Layout', () => {
  test('should render component', () => {
    const component = render(
      <BrowserRouter>
        <Switch>
          <LanguageProvider>
            <Layout />
          </LanguageProvider>
        </Switch>
      </BrowserRouter>,
    );

    expect(component).toBeDefined();
  });
});
