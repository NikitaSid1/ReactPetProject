import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import { useJWTAccess } from '../../../../hooks/http.hook';
import './index.scss';
import editButton from './assets/edit-button.svg';
import deleteButton from './assets/delete-button.svg';
import nextPage from './assets/next-page.svg';

export const TodoItem = ({ text, id, isDone, getTodoListItems }) => {
  const [name, setName] = useState(text);
  const [disabled, setDisabled] = useState(true);
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

  return (
    <li className="todo-element" id={id}>
      <input
        className="todo-element__input"
        style={isDone ? { textDecorationLine: 'line-through' } : null}
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
        <img src={editButton} alt="editButton" />
      </button>

      <button type="button" className="todo-element__delete" onClick={() => onDelete(id)}>
        <img src={deleteButton} alt="delete" />
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
        onClick={() => history.push(`/todo-list/${id}`)}
      >
        <img src={nextPage} alt="next-page" />
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
