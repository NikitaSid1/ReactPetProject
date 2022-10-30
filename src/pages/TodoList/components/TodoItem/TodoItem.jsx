import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { requestTodo } from 'services';
import { Routes } from 'routes/constants';

import editButtonImg from './assets/editButton.svg';
import deleteButtonImg from './assets/deleteButton.svg';
import nextPageImg from './assets/nextPage.svg';

import './index.scss';

export const TodoItem = ({ text, id, isDone, getTodoListItems }) => {
  const [name, setName] = React.useState(text);
  const [disabled, setDisabled] = React.useState(true);
  const history = useHistory();

  const handlerOnDelete = async () => {
    try {
      await requestTodo({
        url: '/user/todo-list',
        method: 'delete',
        data: { todoId: id },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const handlerOnChecked = async () => {
    try {
      await requestTodo({
        url: '/user/todo-list/edit-is-done',
        method: 'put',
        data: { todoId: id, isDone: !isDone },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onEdit = async (todoId) => {
    try {
      await requestTodo({
        url: '/user/todo-list/edit-title',
        method: 'post',
        data: { todoId, title: name },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const handlerOnEdit = () => {
    setDisabled(!disabled);
    if (!disabled) {
      onEdit(id);
    }
  };

  const handleFollowNextPage = () => {
    history.push(Routes.getSinglePage(id));
  };

  const inputClassName = cn('todo-element__input', {
    'field_decoration-line': isDone,
  });

  return (
    <li className="todo-element">
      <input
        className={inputClassName}
        type="text"
        disabled={disabled}
        name="todoElement"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button
        type="button"
        className="todo-element__edit"
        name="todoElement"
        onClick={handlerOnEdit}
      >
        <img src={editButtonImg} alt="editButton" />
      </button>

      <button type="button" className="todo-element__delete" onClick={handlerOnDelete}>
        <img src={deleteButtonImg} alt="delete" />
      </button>

      <label>
        <input
          className="todo-element__checkbox"
          type="checkbox"
          checked={isDone}
          onChange={handlerOnChecked}
        />
        <span className="todo-element__checkmark" />
      </label>

      <button type="button" className="todo-element__next-page" onClick={handleFollowNextPage}>
        <img src={nextPageImg} alt="next-page" />
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDone: PropTypes.bool.isRequired,
  getTodoListItems: PropTypes.func.isRequired,
};
