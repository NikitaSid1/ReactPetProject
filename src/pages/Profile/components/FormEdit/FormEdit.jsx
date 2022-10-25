import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../../../hooks/httphook';
import { Routes } from '../../../../routes/constants';
import { ProfileForm } from '../ProfileForm';

export const FormEdit = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.Profile);
  };

  const { request } = useJWTAccess();

  const handlerOnSubmit = async ({ firstNameProfile, lastNameProfile }) => {
    try {
      await request({
        url: 'http://localhost:4040/user/profile',
        method: 'put',
        data: { firstName: firstNameProfile, lastName: lastNameProfile },
      });

      redirect();
    } catch (e) {
      toast.error('Something Went Wrong 😢 \nPlease Try Again');
    }
  };

  const exitButton = (
    <button type="button" className="profile-form__button" onClick={redirect}>
      Exit
    </button>
  );

  return (
    <ProfileForm
      formButtonName="Save"
      formButtonType="submit"
      exitButton={exitButton}
      isInputDisabled={false}
      handlerOnSubmit={handlerOnSubmit}
    />
  );
};
