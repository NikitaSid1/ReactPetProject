import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { switchLanguageLabels, enLanguage, uaLanguage, ruLanguage } from 'translations';
import { Routes } from 'routes/constants';
import { Navbar } from './Navbar';

const render = (route = '/') => renderWithRouter(<Navbar />, { route });

const setLocalStorage = (id, data) => {
  localStorage.setItem(id, data);
};

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('Navbar', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should logout when user click on logout button', async () => {
    const mockId = 'myJWT';
    const mockData = 'JwtIsTrue';

    setLocalStorage(mockId, mockData);
    render();

    userEvent.click(screen.getByRole('button', { name: enLanguage.navbar_button_logout }));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.Index));

    expect(localStorage.getItem(mockId)).toBeUndefined();
  });

  test('should follow when user click on profile button', async () => {
    const { history } = render();

    userEvent.click(screen.getByRole('link', { name: enLanguage.navbar_link_profile }));

    await waitFor(() => expect(history.location.pathname).toEqual(Routes.Profile));
  });

  test('should follow when user click on to-do list button', async () => {
    const { history } = render();

    userEvent.click(screen.getByRole('link', { name: enLanguage.navbar_link_todo }));

    await waitFor(() => expect(history.location.pathname).toEqual(Routes.TodoList));
  });

  test('should correctly switch language', async () => {
    render();

    expect(screen.getByText(enLanguage.navbar_button_logout)).toBeVisible();

    userEvent.click(screen.getByText(switchLanguageLabels.UKRAINIAN_LANGUAGE));
    await waitFor(() => expect(screen.getByText(uaLanguage.navbar_button_logout)).toBeVisible());

    userEvent.click(screen.getByText(switchLanguageLabels.RUSSIAN_LANGUAGE));
    await waitFor(() => expect(screen.getByText(ruLanguage.navbar_button_logout)).toBeVisible());

    userEvent.click(screen.getByText(switchLanguageLabels.ENGLISH_LANGUAGE));
    await waitFor(() => expect(screen.getByText(enLanguage.navbar_button_logout)).toBeVisible());
  });
});
