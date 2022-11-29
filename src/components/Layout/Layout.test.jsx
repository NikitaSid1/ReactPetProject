import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen } from '@testing-library/react';

import { Routes } from 'routes/constants';
import enLanguage from 'translations/en-US/en-US.json';

import { Layout } from './Layout';

const CHILDREN_TEXT = 'Children';
const MOCK_URL = '/mock-url';

const render = (route = '/') =>
  renderWithRouter(
    <Layout>
      <div>{CHILDREN_TEXT}</div>
    </Layout>,
    { route },
  );

describe('Layout', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should show children', () => {
    render();

    expect(screen.getByText(CHILDREN_TEXT)).toBeVisible();
  });

  test('should not show navbar', () => {
    render(Routes.Index);

    expect(
      screen.queryByRole('button', { name: enLanguage.navbar_button_logout }),
    ).not.toBeInTheDocument();
  });

  test('should show navbar', () => {
    render(MOCK_URL);

    expect(
      screen.getByRole('button', { name: enLanguage.navbar_button_logout }),
    ).toBeInTheDocument();
  });
});
