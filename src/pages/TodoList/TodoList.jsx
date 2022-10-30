import * as React from 'react';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';

import { requestTodo } from 'services';
import { Navbar } from 'components/Navbar';
import { TodoItem } from './components/TodoItem';

import addTodoImg from './assets/btnAddTodo.svg';

import './index.scss';

export const TodoList = () => {
  const [todoText, setTodoText] = React.useState('');
  const [todoItems, setTodoItems] = React.useState(null);

  const getTodoListItems = async () => {
    try {
      const { data } = await requestTodo({
        url: '/user/todo-list',
      });
      setTodoItems(data.entity);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
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
      }
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }

    resetForm({ values: '' });
  };

  const initialValues = {
    todoText,
  };

  return (
    <>
      <Navbar />
      <section className="container todo-section">
        <Formik initialValues={initialValues} onSubmit={handlerOnSubmit}>
          <Form className="todo-form">
            <Field
              autoFocus
              className="todo-form__input"
              name="todoText"
              type="text"
              placeholder="New todo"
            />
            <button className="todo-form__btn-add-todo" type="submit">
              <img src={addTodoImg} alt="add-todo" />
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
              />
            ))}
        </ul>
      </section>
    </>
  );
};
