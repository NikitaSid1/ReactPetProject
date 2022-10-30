import { TODO_LIST_URL } from 'config';
import { createApiInstance } from './httpService';

export const requestTodo = createApiInstance(TODO_LIST_URL);
