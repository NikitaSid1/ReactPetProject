import { Switch, Route } from 'react-router-dom';
import { useIntl } from 'react-intl';

import { Routes } from 'routes/constants';
import { Navbar } from 'components/Navbar';
import { FormView, FormEdit } from './components';

import './index.scss';

export const Profile = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Navbar />
      <section className="container">
        <div className="profile-form">
          <h3 className="profile-form__text">{formatMessage({ id: 'profile_title' })}</h3>

          <Switch>
            <Route exact path={Routes.Profile}>
              <FormView />
            </Route>

            <Route exact path={Routes.ProfileEdit}>
              <FormEdit />
            </Route>
          </Switch>
        </div>
      </section>
    </>
  );
};
