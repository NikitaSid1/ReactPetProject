import * as React from 'react';
import { renderWithRouter } from 'test';
import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { Routes } from 'routes/constants';

import { enLanguage } from 'translations';
import { TodoList } from './TodoList';

const render = () => renderWithRouter(<TodoList />);

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
}));

const TODOLIST_API_URL = '/user/todo-list';

const MOCK_TITLE_1 = 'MOCK TITLE 1';
const MOCK_TITLE_2 = 'MOCK TITLE 2';
const MOCK_ID = 'cB7OPTq2scK4gbsG';

// const error = new Error('Host cannot be reached');

const createResponse = (showFirsItem = false) => {
  const todoList = [
    {
      dateCreated: '2022-11-05T15:17:31.033Z',
      dateUpdated: '2022-11-05T15:17:31.033Z',
      isDone: false,
      title: MOCK_TITLE_1,
      userId: '5GF9XOILina8fNF7',
      _id: MOCK_ID,
    },
    {
      dateCreated: '2022-12-06T19:23:32.977Z',
      dateUpdated: '2022-12-06T19:23:32.977Z',
      isDone: true,
      title: MOCK_TITLE_2,
      userId: '5GF9XOILina8fNF7',
      _id: 'f4BRxle09ZNBDdwJ',
    },
  ];

  return {
    data: {
      entity: showFirsItem ? todoList.slice(0, 1) : todoList,
    },
    method: 'GET',
    url: TODOLIST_API_URL,
  };
};

const EMPTY_MESSAGE_RESPONSE = {
  data: {
    entity: [],
  },
  method: 'GET',
  url: TODOLIST_API_URL,
};

describe('TodoList', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should find filled new todo input and return response', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, createResponse());

    fireEvent.change(screen.getByTestId('todoList-input'), '123456');
    // userEvent.type(screen.getByTestId('todoList-input'), '123456');

    await waitFor(() => expect(screen.getByDisplayValue('123456')).toBeVisible());

    screen.debug(screen.getByTestId('todoList-input'));

    // const todoListSubmitButton = await screen.findByText(enLanguage.todoList_button);

    // expect(todoListSubmitButton).toBeEnabled();

    // userEvent.click(todoListSubmitButton);

    // await waitFor(() =>
    //   expect(mockAxios).toHaveBeenLastCalledWith(
    //     expect.objectContaining({
    //       url: TODOLIST_API_URL,
    //       method: 'POST',
    //       data: { title: MOCK_TITLE_1 },
    //     }),
    //   ),
    // );
  });

  test('should show all todo-list items', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, createResponse());

    await waitFor(() => expect(screen.getByDisplayValue(MOCK_TITLE_1)).toBeVisible());
    await waitFor(() => expect(screen.getByDisplayValue(MOCK_TITLE_2)).toBeVisible());
  });

  test('should show checked todoItems', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, createResponse());

    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked());
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
  });

  test('should delete item when click on delete button', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, createResponse(true));

    const deleteButton = await screen.findByAltText('delete');
    userEvent.click(deleteButton);

    await waitFor(() =>
      expect(mockAxios).toHaveBeenCalledWith(
        expect.objectContaining({
          url: '/user/todo-list',
          method: 'DELETE',
          data: { todoId: MOCK_ID },
        }),
      ),
    );
  });

  test('should redirects when user click on next page button', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, createResponse(true));

    const nextPageButton = await screen.findByAltText('next-page');
    userEvent.click(nextPageButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith(Routes.getSinglePage(MOCK_ID)));
  });

  test('should show skeleton and empty message when have not todo items', async () => {
    render();

    mockAxios.mockResponseFor({ url: TODOLIST_API_URL }, EMPTY_MESSAGE_RESPONSE);

    expect(screen.getByTestId('skeleton')).toBeVisible();

    await waitFor(() =>
      expect(screen.getByText('You have no todo items yet! Add one above!')).toBeVisible(),
    );
  });

  test('should show error in todo list', async () => {
    render();

    mockAxios.mockError();

    await waitFor(() =>
      expect(screen.getByText('Something Went Wrong, Please Try Again Later')).toBeVisible(),
    );
  });
});
