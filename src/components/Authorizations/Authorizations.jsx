import * as React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import { requestTodo } from 'services';
import { Routes } from 'routes/constants';
import { InputField } from './components';
import { initialValues } from './constants';
import { LoginSchema } from './utils';

import './index.scss';

export const Authorizations = ({
  requestUrl,
  pageNameLabel,
  switchPageBtnLabel,
  pageBackgroundImg,
  switchPageBtnRoute,
  formClassName,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const handlerOnSubmit = async ({ email, password }, { resetForm }) => {
    setIsLoading(true);
    try {
      const { data } = await requestTodo({
        url: requestUrl,
        method: 'post',
        data: { email, password },
      });

      localStorage.setItem('myJWT', data.entity);

      history.push(Routes.Profile);
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    } finally {
      setIsLoading(false);
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

          <InputField placeholder="Email" type="email" id="email" name="email" />
          <InputField
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="on"
          />

          <button className="authorisation__form__button" type="submit" disabled={isLoading}>
            {pageNameLabel}
          </button>
        </Form>
      </Formik>

      <img className="authorisation__img" src={pageBackgroundImg} alt="authorisationImg" />
      <Link className="authorisation__link" to={switchPageBtnRoute}>
        <button type="button" className="authorisation__form__button" disabled={isLoading}>
          {switchPageBtnLabel}
        </button>
      </Link>
    </div>
  );
};

Authorizations.propTypes = {
  requestUrl: PropTypes.string.isRequired,
  pageNameLabel: PropTypes.string.isRequired,
  switchPageBtnLabel: PropTypes.string.isRequired,
  pageBackgroundImg: PropTypes.string.isRequired,
  switchPageBtnRoute: PropTypes.string.isRequired,
  formClassName: PropTypes.string.isRequired,
};
