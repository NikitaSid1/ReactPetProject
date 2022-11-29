import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Routes } from 'routes/constants';
import { Authorizations } from './Authorizations';

const PAGE_NAME_LABEL = 'authorization_login';
const EMAIL_IS_REQUIRED = 'email is a required field';
const PASSWORD_IS_REQUIRED = 'password is a required field';

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

    expect(screen.getByLabelText('Email')).toBeVisible();
    expect(screen.getByLabelText('Password')).toBeVisible();
  });

  test('should show email and password errors', async () => {
    render();

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() => expect(screen.getByText(EMAIL_IS_REQUIRED)).toBeVisible());
    await waitFor(() => expect(screen.getByText(PASSWORD_IS_REQUIRED)).toBeVisible());
  });

  test('should find filled email and password fields', async () => {
    render();

    userEvent.type(screen.getByLabelText('Email'), 'second@gmail.com');

    await waitFor(() => expect(screen.getByDisplayValue('second@gmail.com')).toBeVisible());

    userEvent.type(screen.getByLabelText('Password'), '123ds2r1dwasd');

    await waitFor(() => expect(screen.getByDisplayValue('123ds2r1dwasd')).toBeVisible());
  });

  test('should find filled email field and password error', async () => {
    render();

    userEvent.type(screen.getByLabelText('Email'), 'second@gmail.com');

    await waitFor(() => expect(screen.getByDisplayValue('second@gmail.com')).toBeVisible());

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() => expect(screen.getByText(PASSWORD_IS_REQUIRED)).toBeVisible());
  });

  test('should find filled password field and email error', async () => {
    render();

    userEvent.type(screen.getByLabelText('Password'), '123ds2r1dwasd');

    await waitFor(() => expect(screen.getByDisplayValue('123ds2r1dwasd')).toBeVisible());

    userEvent.click(screen.getByRole('button', { name: PAGE_NAME_LABEL }));

    await waitFor(() => expect(screen.getByText(EMAIL_IS_REQUIRED)).toBeVisible());
  });
});
