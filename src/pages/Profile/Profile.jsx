import { Switch, Route } from 'react-router-dom';

import { FormView, FormEdit } from './components';
import { Routes } from '../../routes/constants';
import { Navbar } from '../../components/Navbar';

import './index.scss';

export const Profile = () => (
  <>
    <Navbar />
    <section className="container">
      <div className="profile-form">
        <h3 className="profile-form__text">Profile</h3>

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
