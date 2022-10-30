import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Routes } from 'routes/constants';
import { requestTodo } from 'services';
import { ProfileForm } from '../ProfileForm';

export const FormEdit = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.Profile);
  };

  const handlerOnSubmit = async ({ firstNameProfile, lastNameProfile }) => {
    try {
      await requestTodo({
        url: '/user/profile',
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
      Cancel
    </button>
  );

  return (
    <ProfileForm
      formButtonName="Save"
      isSubmitButton
      exitButton={exitButton}
      isInputDisabled={false}
      handlerOnSubmit={handlerOnSubmit}
    />
  );
};
