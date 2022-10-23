import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useApi } from '../../hooks/httphook';
import { initialValues, LoginSchema, InputText } from './utils';
import { Routes } from '../../routes/constants';

import './index.scss';

export const Authorizations = ({
  requestUrl,
  pageNameLabel,
  switchPageBtnLabel,
  pageBackgroundImg,
  switchPageBtnRoute,
  formClassName,
}) => {
  const history = useHistory();

  const { request } = useApi();

  const handlerOnSubmit = async ({ email, password }, { resetForm }) => {
    try {
      await request({
        url: requestUrl,
        method: 'post',
        data: { email, password },
      });

      history.push(Routes.Profile);
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
        <Form className={formClassName}>
          <h3 className="authorisation__form__text">{pageNameLabel}</h3>

          <InputText placeholder="Email" type="email" name="email" />
          <InputText placeholder="Password" type="password" name="password" autoComplete="on" />

          <button className="authorisation__form__button" type="submit">
            {pageNameLabel}
          </button>
        </Form>
      </Formik>

      <img className="authorisation__img" src={pageBackgroundImg} alt="authorisationImg" />
      <Link className="link" to={switchPageBtnRoute}>
        <button type="button" className="authorisation__form__button link__btn">
          {switchPageBtnLabel}
        </button>
      </Link>
    </div>
  );
};
