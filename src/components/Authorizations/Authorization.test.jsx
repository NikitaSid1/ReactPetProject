import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Routes } from 'routes/constants';
import { enLanguage } from 'translations';
import { Authorizations } from './Authorizations';

const PAGE_NAME_LABEL = 'authorization_login';
const LOGIN_AUTHORIZATION = 'second@gmail.com';
const PASSWORD_AUTHORIZATION = '123ds2r1dwasd';

const render = (route = '/') =>
  renderWithRouter(
    <Authorizations
      requestUrl="/login"
      pageBackgroundImg="loginImg"
      switchPageBtnRoute={Routes.Registration}
      formClassName="authorisation__form"
      pageNameLabel={PAGE_NAME_LABEL}
      switchPageBtnLabel="authorization_signup"
      toastSuccessfulAuthorizationMessage="toast_success_login"
    />,
    { route },
  );

describe('Authorizations', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should display all labels', () => {
    render();

    expect(screen.getByLabelText(enLanguage.authorization_email)).toBeVisible();
    expect(screen.getByLabelText(enLanguage.authorization_password)).toBeVisible();
  });

  test('should show email and password errors', async () => {
    render();

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() =>
      expect(screen.getByText(enLanguage.authorization_email_error)).toBeVisible(),
    );

    await waitFor(() =>
      expect(screen.getByText(enLanguage.authorization_password_error)).toBeVisible(),
    );
  });

  test('should find filled email and password fields', async () => {
    render();

    userEvent.type(screen.getByLabelText(enLanguage.authorization_email), LOGIN_AUTHORIZATION);

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_AUTHORIZATION)).toBeVisible());

    userEvent.type(
      screen.getByLabelText(enLanguage.authorization_password),
      PASSWORD_AUTHORIZATION,
    );

    await waitFor(() => expect(screen.getByDisplayValue(PASSWORD_AUTHORIZATION)).toBeVisible());
  });

  test('should find filled email field and password error', async () => {
    render();

    userEvent.type(screen.getByLabelText(enLanguage.authorization_email), LOGIN_AUTHORIZATION);

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_AUTHORIZATION)).toBeVisible());

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() =>
      expect(screen.getByText(enLanguage.authorization_password_error)).toBeVisible(),
    );
  });

  test('should find filled password field and email error', async () => {
    render();

    userEvent.type(
      screen.getByLabelText(enLanguage.authorization_password),
      PASSWORD_AUTHORIZATION,
    );

    await waitFor(() => expect(screen.getByDisplayValue(PASSWORD_AUTHORIZATION)).toBeVisible());

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() =>
      expect(screen.getByText(enLanguage.authorization_email_error)).toBeVisible(),
    );
  });

  test('should be type of input password', () => {
    render();

    expect(screen.getByLabelText(enLanguage.authorization_password)).toHaveAttribute(
      'type',
      'password',
    );
  });
});
