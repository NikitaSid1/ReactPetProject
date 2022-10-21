import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { InputText, initialValues, LoginSchema } from './authorizations';
import { useHttp } from '../../hooks/httphook';

import img from './assets/login.svg';

import './index.scss';

export const Login = () => {
  const history = useHistory();

  const { request } = useHttp();

  const handlerOnSubmit = async ({ email, password }, { resetForm }) => {
    try {
      await request({
        url: 'http://localhost:4040/login',
        method: 'post',
        data: { email, password },
      });

      history.push('/profile');
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }

    resetForm({ email: '', password: '' });
  };

  return (
    <div className="authorisation">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handlerOnSubmit}
      >
        <Form className="authorisation__form">
          <p className="authorisation__form__text">Login</p>

          <InputText placeholder="Email" type="email" name="email" />
          <InputText placeholder="Password" type="password" name="password" autoComplete="on" />

          <button className="authorisation__form__button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <img className="authorisation__img" src={img} alt="authorisationImg" />
      <Link className="link" to="/registration">
        <button type="button" className="authorisation__form__button link__btn">
          Sign Up
        </button>
      </Link>
    </div>
  );
};
