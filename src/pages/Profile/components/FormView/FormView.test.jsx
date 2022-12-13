import * as React from 'react';
import mockAxios from 'jest-mock-axios';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Routes } from 'routes/constants';
import { enLanguage } from 'translations';
import { FormView } from './FormView';

const render = () => renderWithRouter(<FormView />);

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const PROFILE_API_URL = '/user/profile';

const EMAIL_VALUE = 'Email@mail.com';
const FIRST_NAME_VALUE = 'Mock First Name user';
const LAST_NAME_VALUE = 'Mock Last Name user';

const response = {
  data: {
    entity: { email: EMAIL_VALUE, firstName: FIRST_NAME_VALUE, lastName: LAST_NAME_VALUE },
  },
  method: 'GET',
  url: PROFILE_API_URL,
};

describe('FormView', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should show skeleton and input values', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    expect(screen.getByTestId('skeleton')).toBeVisible();

    await waitFor(() => expect(screen.getByDisplayValue(EMAIL_VALUE)).toBeVisible());
    await waitFor(() => expect(screen.getByDisplayValue(FIRST_NAME_VALUE)).toBeVisible());
    await waitFor(() => expect(screen.getByDisplayValue(LAST_NAME_VALUE)).toBeVisible());
  });

  test('should show edit button', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => expect(screen.getByText(enLanguage.profile_button_edit)).toBeVisible());
  });

  test('should redirects when user click on edit button', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => userEvent.click(screen.getByText(enLanguage.profile_button_edit)));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.ProfileEdit));
  });
});
