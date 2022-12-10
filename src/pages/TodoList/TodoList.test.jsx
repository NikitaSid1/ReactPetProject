import * as React from 'react';
import { renderWithRouter } from 'test';
import axios from 'axios';
import { screen, waitFor } from '@testing-library/react';
// import mockAxios from 'jest-mock-axios';
// import userEvent from '@testing-library/user-event';

// import { enLanguage } from 'translations';
import { TodoList } from './TodoList';

const render = () => renderWithRouter(<TodoList />);

const TODOLIST_API_URL = '/user/todo-list';

const MOCK_TITLE_1 = 'MOCK TITLE 1';
const MOCK_TITLE_2 = 'MOCK TITLE 2';

const response = {
  data: {
    entity: [
      {
        dateCreated: '2022-11-05T15:17:31.033Z',
        dateUpdated: '2022-11-05T15:17:31.033Z',
        isDone: false,
        title: MOCK_TITLE_1,
        userId: '5GF9XOILina8fNF7',
        _id: 'cB7OPTq2scK4gbsG',
      },
      {
        dateCreated: '2022-12-06T19:23:32.977Z',
        dateUpdated: '2022-12-06T19:23:32.977Z',
        isDone: true,
        title: MOCK_TITLE_2,
        userId: '5GF9XOILina8fNF7',
        _id: 'f4BRxle09ZNBDdwJ',
      },
    ],
  },
  method: 'GET',
  url: TODOLIST_API_URL,
};

describe('TodoList', () => {
  test('should render component', () => {
    const component = render();

    expect(component).toBeDefined();
  });

  test('should show all todo-list items', async () => {
    render();

    axios.mockResponseFor({ url: TODOLIST_API_URL }, response);

    await waitFor(() => expect(screen.getByDisplayValue(MOCK_TITLE_1)).toBeVisible());
    await waitFor(() => expect(screen.getByDisplayValue(MOCK_TITLE_2)).toBeVisible());
  });

  test('should show checked todoItems', async () => {
    render();

    axios.mockResponseFor({ url: TODOLIST_API_URL }, response);

    await waitFor(() => expect(screen.getAllByRole('checkbox')[0]).not.toBeChecked());
    expect(screen.getAllByRole('checkbox')[1]).toBeChecked();
  });
});
