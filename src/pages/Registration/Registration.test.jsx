import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import userEvent from '@testing-library/user-event';

import { enLanguage } from 'translations';
import { Registration } from './Registration';

const LOGIN_EMAIL = 'second@gmail.com';
const LOGIN_PASSWORD = '123ds2r1dwasd';
const SIGNUP_API_URL = '/signup';

const render = () => renderWithRouter(<Registration />);

describe('Registration', () => {
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

    userEvent.click(screen.getByRole('button', { name: enLanguage.authorization_signup }));

    await waitFor(() =>
      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: SIGNUP_API_URL,
          data: { email: LOGIN_EMAIL, password: LOGIN_PASSWORD },
        }),
      ),
    );
  });
});
