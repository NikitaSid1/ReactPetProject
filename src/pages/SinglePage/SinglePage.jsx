import * as React from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { requestTodo } from 'services';
import { Navbar } from 'components/Navbar';
import { Routes } from 'routes/constants';

import './index.scss';

export const SinglePage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [title, setTitle] = React.useState('');
  const [isDone, setIsDone] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [initialTitle, setInitialTitle] = React.useState('');

  const getTitle = async () => {
    setIsLoading(true);
    try {
      const { data } = await requestTodo({
        url: `/user/todo-list/${id}`,
      });

      setIsDone(data.entity.isDone);
      setTitle(data.entity.title);
      setInitialTitle(data.entity.title);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerOnDelete = async () => {
    setIsLoading(true);
    try {
      await requestTodo({
        url: '/user/todo-list',
        method: 'delete',
        data: { todoId: id },
      });

      history.push(Routes.TodoList);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerOnChecked = async () => {
    setIsLoading(true);
    try {
      await requestTodo({
        url: '/user/todo-list/edit-is-done',
        method: 'put',
        data: { todoId: id, isDone: !isDone },
      });
      setIsDone(!isDone);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  const handlerOnEdit = async () => {
    setIsLoading(true);
    try {
      await requestTodo({
        url: '/user/todo-list/edit-title',
        method: 'post',
        data: { todoId: id, title },
      });
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getTitle();
  }, [id, isDone]);

  React.useEffect(() => {
    if (title !== initialTitle) {
      handlerOnEdit();
    }
  }, [title]);

  const textareaClassName = cn('single-page__field__textarea', {
    'field_decoration-line': isDone,
  });

  return (
    <>
      <Navbar />
      <main className="single-page">
        <div className="single-page__buttons">
          <button
            type="button"
            className="single-page__buttons__done"
            disabled={isLoading}
            onClick={handlerOnChecked}
          >
            DONE
          </button>
          <button
            type="button"
            className="single-page__buttons__delete"
            disabled={isLoading}
            onClick={handlerOnDelete}
          >
            DELETE
          </button>
          <button
            type="button"
            className="single-page__buttons__go-back"
            disabled={isLoading}
            onClick={history.goBack}
          >
            GO BACK
          </button>
        </div>

        <div className="single-page__field">
          <DebounceInput
            element="textarea"
            className={textareaClassName}
            debounceTimeout={300}
            value={title}
            disabled={isLoading}
            onChange={(event) => {
              setTitle(event.target.value);

              if (!event.target.value) {
                handlerOnDelete();
              }
            }}
          />
        </div>
      </main>
    </>
  );
};
