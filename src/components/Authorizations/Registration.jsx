import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { InputText, initialValues, LoginSchema } from './authorizations';

import { useHttp } from '../../hooks/http.hook';
import './index.scss';
import img from './assets/signUp.svg';

export const Registration = () => {
  const history = useHistory();

  const { request } = useHttp();

  const handlerOnSubmit = async ({ email, password }, { resetForm }) => {
    try {
      await request({
        url: 'http://localhost:4040/signup',
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
        <Form className="authorisation__form reverse">
          <p className="authorisation__form__text">Sign Up</p>

          <InputText placeholder="Email" type="email" name="email" />
          <InputText placeholder="Password" type="password" name="password" autoComplete="on" />

          <button className="authorisation__form__button" type="submit">
            Sign Up
          </button>
        </Form>
      </Formik>

      <img className="authorisation__img" src={img} alt="authorisationImg" />
      <Link className="link" to="/">
        <button type="button" className="authorisation__form__button link__btn">
          Login
        </button>
      </Link>
    </div>
  );
};
