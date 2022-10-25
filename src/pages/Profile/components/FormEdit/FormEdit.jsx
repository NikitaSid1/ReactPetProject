import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useJWTAccess } from '../../../../hooks/httphook';
import { Routes } from '../../../../routes/constants';
import { ProfileForm } from '..';

export const FormEdit = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.Profile);
  };

  const { request } = useJWTAccess();

  const handlerOnSubmit = async (value) => {
    try {
      await request({
        url: 'http://localhost:4040/user/profile',
        method: 'put',
        data: { firstName: value.firstNameProfile, lastName: value.lastNameProfile },
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
      isButtonSubmit="submit"
      exitButton={exitButton}
      isInputDisabled={false}
      handlerOnSubmit={handlerOnSubmit}
    />
  );
};
