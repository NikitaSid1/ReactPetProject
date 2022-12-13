import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { useIntl } from 'react-intl';

import { requestTodo } from 'services';
import { TodoItem, TodoSkeleton, TodoMessage } from './components';

import './index.scss';

export const TodoList = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [todoItems, setTodoItems] = React.useState(null);
  const [todoText, setTodoText] = React.useState('');
  const [todoEmptyMessage, setTodoEmptyMessage] = React.useState(false);
  const [todoErrorMessage, setTodoErrorMessage] = React.useState(false);

  const { formatMessage } = useIntl();

  const getTodoListItems = async () => {
    setIsLoading(true);
    try {
      const { data } = await requestTodo({
        url: '/user/todo-list',
      });

      setTodoErrorMessage(false);

      setTodoItems(data.entity);

      if (data.entity.length < 1) {
        setTodoEmptyMessage(true);
      } else {
        setTodoEmptyMessage(false);
      }
    } catch (e) {
      setTodoEmptyMessage(false);
      setTodoErrorMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getTodoListItems();
  }, []);

  const handlerOnSubmit = async (values, { resetForm }) => {
    console.log({ values });

    try {
      const { data } = await requestTodo({
        url: '/user/todo-list',
        method: 'POST',
        data: { title: values.todoText },
      });
      setTodoText(values.todoText);

      console.log({ data });

      if (data.message === 'Ok') {
        getTodoListItems();

        toast.success(formatMessage({ id: 'toast_success_addTodo' }));
      }
    } catch (e) {
      toast.error(formatMessage({ id: 'toast_error' }));

      setTodoEmptyMessage(false);
      setTodoErrorMessage(true);
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
            data-testid="todoList-input"
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
              dateCreated={el.dateCreated}
            />
          ))}

        {todoErrorMessage && (
          <TodoMessage
            messageClassName="todo-form__error-message"
            messageName={formatMessage({ id: 'todoList_errorMessage' })}
          />
        )}

        {!todoItems && !todoErrorMessage && <TodoSkeleton />}

        {todoEmptyMessage && (
          <TodoMessage
            messageClassName="todo-form__empty-message"
            messageName={formatMessage({ id: 'todoList_emptyMessage' })}
          />
        )}
      </ul>
    </section>
  );
};
