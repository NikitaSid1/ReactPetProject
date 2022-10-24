import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useJWTAccess } from '../../../../hooks/httphook';
import { Routes } from '../../../../routes/constants';

import editButtonImg from './assets/editButton.svg';
import deleteButtonImg from './assets/deleteButton.svg';
import nextPageImg from './assets/nextPage.svg';

import './index.scss';

export const TodoItem = ({ text, id, isDone, getTodoListItems }) => {
  const [name, setName] = React.useState(text);
  const [disabled, setDisabled] = React.useState(true);
  const history = useHistory();

  const { request } = useJWTAccess();

  const onDelete = async (todoId) => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list',
        method: 'delete',
        data: { todoId },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onChecked = async (todoId, isTodoDone) => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list/edit-is-done',
        method: 'put',
        data: { todoId, isDone: !isTodoDone },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onEdit = async (todoId) => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list/edit-title',
        method: 'post',
        data: { todoId, title: name },
      });

      getTodoListItems();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const inpntClassName = cn('todo-element__input', { inputDecoration: isDone });

  return (
    <li className="todo-element">
      <input
        className={inpntClassName}
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
        onClick={() => {
          setDisabled(!disabled);
          if (!disabled) {
            onEdit(id);
          }
        }}
      >
        <img src={editButtonImg} alt="editButton" />
      </button>

      <button type="button" className="todo-element__delete" onClick={() => onDelete(id)}>
        <img src={deleteButtonImg} alt="delete" />
      </button>

      <label className="containerLabel">
        <input
          className="todo-element__checkbox"
          type="checkbox"
          checked={isDone}
          onChange={() => onChecked(id, isDone)}
        />
        <span className="todo-element__checkmark" />
      </label>

      <button
        type="button"
        className="todo-element__next-page"
        onClick={() => history.push(Routes.getSinglePage(id))}
      >
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
