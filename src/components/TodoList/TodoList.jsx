import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { TodoItem } from './components/TodoItem';

import { useJWTAccess } from '../../hooks/http.hook';
import { Navbar } from '../Navbar/Navbar';
import './index.scss';
import addTodo from './assets/btn-addTodo.svg';

export const TodoList = () => {
  const { request } = useJWTAccess();

  const [todoText, setTodoText] = useState('');
  const [todoItems, setTodoItems] = useState(null);

  const getTodoListItems = async () => {
    try {
      const { data } = await request({
        url: 'http://localhost:4040/user/todo-list',
        method: 'get',
      });
      setTodoItems(data.entity);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  useEffect(() => {
    getTodoListItems();
  }, []);

  const handlerOnSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await request({
        url: 'http://localhost:4040/user/todo-list',
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
      <section className="container" style={{ display: 'flex', flexDirection: 'column' }}>
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
              <img src={addTodo} alt="add-todo" />
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
