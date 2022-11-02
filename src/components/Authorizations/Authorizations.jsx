import * as React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { requestTodo } from 'services';
import { Routes } from 'routes/constants';
import { LanguageButtons } from 'components/LanguageButtons';
import { initialValues } from './constants';
import { InputField } from './components';
import { LoginSchema } from './utils';

import './index.scss';

export const Authorizations = ({
  requestUrl,
  pageNameLabel,
  switchPageBtnLabel,
  pageBackgroundImg,
  switchPageBtnRoute,
  formClassName,
  toastSuccessfulAuthorizationMessage,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();

  const { formatMessage } = useIntl();

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

      toast.success(toastSuccessfulAuthorizationMessage);
    } catch (e) {
      toast.error(formatMessage({ id: 'toast_error' }));
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
          <LanguageButtons buttonsPositionNavbar={false} buttonsPositionAuthorization />
          <h3 className="authorisation__form__text">{pageNameLabel}</h3>

          <InputField
            placeholder={formatMessage({ id: 'authorization_email' })}
            type="email"
            id="email"
            name="email"
          />
          <InputField
            placeholder={formatMessage({ id: 'authorization_password' })}
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
  toastSuccessfulAuthorizationMessage: PropTypes.string.isRequired,
};
