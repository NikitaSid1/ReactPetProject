import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { useJWTAccess } from '../../hooks/httphook';
import { Navbar } from '../../components/Navbar';
import { Routes } from '../../routes/constants';

import './index.scss';

export const SinglePage = () => {
  const { request } = useJWTAccess();

  const { id } = useParams();
  const history = useHistory();

  const [title, setTitle] = React.useState('');
  const [isDone, setIsDone] = React.useState(null);
  const [initialTitle, setInitialTitle] = React.useState('');

  const getTitle = async () => {
    try {
      const { data } = await request({
        url: `http://localhost:4040/user/todo-list/${id}`,
        method: 'get',
      });

      setIsDone(data.entity.isDone);
      setTitle(data.entity.title);
      setInitialTitle(data.entity.title);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onDelete = async () => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list',
        method: 'delete',
        data: { todoId: id },
      });

      history.push(Routes.TodoList);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onChecked = async () => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list/edit-is-done',
        method: 'put',
        data: { todoId: id, isDone: !isDone },
      });
      setIsDone(!isDone);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const onEdit = async () => {
    try {
      await request({
        url: 'http://localhost:4040/user/todo-list/edit-title',
        method: 'post',
        data: { todoId: id, title },
      });
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  React.useEffect(() => {
    getTitle();
  }, [id, isDone]);

  React.useEffect(() => {
    if (title !== initialTitle) {
      onEdit();
    }
  }, [title]);

  const textareaCheckbox = cn('single-page__field__textarea', { textareaCheckbox: isDone });

  return (
    <>
      <Navbar />
      <main className="single-page">
        <div className="single-page__buttons">
          <button type="button" className="single-page__buttons__done" onClick={() => onChecked()}>
            DONE
          </button>
          <button
            type="button"
            className="single-page__buttons__delete"
            onClick={() => {
              onDelete();
            }}
          >
            DELETE
          </button>
          <button
            type="button"
            className="single-page__buttons__go-back"
            onClick={() => history.goBack()}
          >
            GO BACK
          </button>
        </div>

        <div className="single-page__field">
          <DebounceInput
            element="textarea"
            className={textareaCheckbox}
            debounceTimeout={300}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);

              if (!event.target.value) {
                onDelete();
              }
            }}
          />
        </div>
      </main>
    </>
  );
};
