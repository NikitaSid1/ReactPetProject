import * as React from 'react';
import mockAxios from 'jest-mock-axios';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Routes } from 'routes/constants';
import { enLanguage } from 'translations';
import { FormEdit } from './FormEdit';

const render = () => renderWithRouter(<FormEdit />);

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

const NEW_FIRST_NAME_VALUE = 'NEW Mock First Name user';
const NEW_LAST_NAME_VALUE = 'NEW Mock Last Name user';

const response = {
  data: {
    entity: { email: EMAIL_VALUE, firstName: FIRST_NAME_VALUE, lastName: LAST_NAME_VALUE },
  },
  method: 'GET',
  url: PROFILE_API_URL,
};

const mockResponse = {
  url: PROFILE_API_URL,
  method: 'PUT',
  data: { firstName: NEW_FIRST_NAME_VALUE, lastName: NEW_LAST_NAME_VALUE },
};

describe('FormEdit', () => {
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

  test('should show save and cancel buttons', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => expect(screen.getByText(enLanguage.profile_button_save)).toBeVisible());
    await waitFor(() => expect(screen.getByText(enLanguage.profile_button_cancel)).toBeVisible());
  });

  test('should fill firstName, lastName inputs and return response', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => userEvent.clear(screen.getByLabelText(enLanguage.profile_firstName)));
    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.profile_firstName), NEW_FIRST_NAME_VALUE),
    );
    await waitFor(() => expect(screen.getByDisplayValue(NEW_FIRST_NAME_VALUE)).toBeVisible());

    await waitFor(() => userEvent.clear(screen.getByLabelText(enLanguage.profile_lastName)));
    await waitFor(() =>
      userEvent.type(screen.getByLabelText(enLanguage.profile_lastName), NEW_LAST_NAME_VALUE),
    );
    await waitFor(() => expect(screen.getByDisplayValue(NEW_LAST_NAME_VALUE)).toBeVisible());

    userEvent.click(screen.getByText(enLanguage.profile_button_save));

    await waitFor(() =>
      expect(mockAxios).toHaveBeenLastCalledWith(
        expect.objectContaining({
          url: PROFILE_API_URL,
          data: {
            firstName: NEW_FIRST_NAME_VALUE,
            lastName: NEW_LAST_NAME_VALUE,
          },
          method: 'PUT',
        }),
      ),
    );
  });

  test('should redirects when user click on cancel button', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => userEvent.click(screen.getByText(enLanguage.profile_button_cancel)));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.Profile));
  });

  test('should redirects when user click on save button', async () => {
    render();

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, response);

    await waitFor(() => userEvent.click(screen.getByText(enLanguage.profile_button_save)));

    mockAxios.mockResponseFor({ url: PROFILE_API_URL }, mockResponse);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.Profile));
  });
});
