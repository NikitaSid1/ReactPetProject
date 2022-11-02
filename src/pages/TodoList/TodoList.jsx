import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { requestTodo } from 'services';
import { TodoItem } from './components/TodoItem';

import './index.scss';

export const TodoList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [todoItems, setTodoItems] = React.useState(null);
  const [todoText, setTodoText] = React.useState('');

  const { formatMessage } = useIntl();

  const getTodoListItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await requestTodo({
        url: '/user/todo-list',
      });
      setTodoItems(data.entity);
    } catch (e) {
      toast.error(formatMessage({ id: 'toast_error' }));
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getTodoListItems();
  }, []);

  const handlerOnSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await requestTodo({
        url: '/user/todo-list',
        method: 'post',
        data: { title: values.todoText },
      });
      setTodoText(values.todoText);

      if (data.message === 'Ok') {
        getTodoListItems();

        toast.success(formatMessage({ id: 'toast_success_addTodo' }));
      }
    } catch (e) {
      toast.error(formatMessage({ id: 'toast_error' }));
    }

    resetForm({ values: '' });
  };

  const initialValues = {
    todoText,
  };

  return (
    <section className="container todo-section">
      <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
        <Form className="todo-form">
          <Field
            autoFocus
            className="todo-form__input"
            name="todoText"
            type="text"
            placeholder={formatMessage({ id: 'todoList_input' })}
            disabled={isLoading}
          />
          <button className="todo-form__btn-add-todo" type="submit" disabled={isLoading}>
            {formatMessage({ id: 'todoList_button' })}
          </button>
        </Form>
      </Formik>

      <ul className="todo-form__ul">
        {todoItems &&
          todoItems.map((el) => (
            <TodoItem
              text={el.title}
              key={el._id}
              id={el._id}
              isDone={el.isDone}
              getTodoListItems={getTodoListItems}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ))}
      </ul>
    </section>
  );
};
