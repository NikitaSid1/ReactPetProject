import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useIp } from '../../hooks/httphook';
import { initialValues, LoginSchema, InputText } from './utils';

import './index.scss';

export const Authorizations = ({ url, name, redirect, img, path, formClass }) => {
  const history = useHistory();

  const { request } = useIp();

  const handlerOnSubmit = async ({ email, password }, { resetForm }) => {
    try {
      await request({
        url,
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
        <Form className={formClass}>
          <p className="authorisation__form__text">{name}</p>

          <InputText placeholder="Email" type="email" name="email" />
          <InputText placeholder="Password" type="password" name="password" autoComplete="on" />

          <button className="authorisation__form__button" type="submit">
            {name}
          </button>
        </Form>
      </Formik>

      <img className="authorisation__img" src={img} alt="authorisationImg" />
      <Link className="link" to={path}>
        <button type="button" className="authorisation__form__button link__btn">
          {redirect}
        </button>
      </Link>
    </div>
  );
};
