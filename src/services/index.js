import { createApiInstance } from './httpService';
import { TODO_LIST_URL } from '../config';

export const requestTodo = createApiInstance(TODO_LIST_URL);
