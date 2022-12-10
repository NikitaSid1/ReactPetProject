import * as React from 'react';
import axios from 'axios';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import userEvent from '@testing-library/user-event';

import { Routes } from 'routes/constants';
import { enLanguage } from 'translations';
import { Login } from './Login';

const LOGIN_EMAIL = 'second@gmail.com';
const LOGIN_PASSWORD = '123ds2r1dwasd';
const LOGIN_API_URL = '/login';

const render = () => renderWithRouter(<Login />);

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const RESPONSE_JWT_KEY = {
  data: { entity: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' },
};

describe('Login', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should return response', async () => {
    render();

    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.authorization_email), LOGIN_EMAIL),
    );

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_EMAIL)).toBeVisible());

    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.authorization_password), LOGIN_PASSWORD),
    );

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_PASSWORD)).toBeVisible());

    userEvent.click(screen.getByRole('button', { name: enLanguage.authorization_login }));

    await waitFor(() =>
      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: LOGIN_API_URL,
          data: { email: LOGIN_EMAIL, password: LOGIN_PASSWORD },
        }),
      ),
    );
  });

  test('should redirects when user click on login button', async () => {
    render();

    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.authorization_email), LOGIN_EMAIL),
    );

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_EMAIL)).toBeVisible());

    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.authorization_password), LOGIN_PASSWORD),
    );

    await waitFor(() => expect(screen.getByDisplayValue(LOGIN_PASSWORD)).toBeVisible());

    await waitFor(() =>
      userEvent.click(screen.getByRole('button', { name: enLanguage.authorization_login })),
    );

    axios.mockResponseFor({ url: LOGIN_API_URL }, RESPONSE_JWT_KEY);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.Profile));
  });
});
