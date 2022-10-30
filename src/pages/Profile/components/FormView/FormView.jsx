import { useHistory } from 'react-router-dom';

import { Routes } from 'routes/constants';
import { ProfileForm } from '../ProfileForm';

export const FormView = () => {
  const history = useHistory();

  const redirect = () => {
    history.push(Routes.ProfileEdit);
  };

  return (
    <ProfileForm
      formButtonName="Edit"
      isSubmitButton={false}
      isEditButton
      handleButtonOnClick={redirect}
      isShowInput
      isInputDisabled
    />
  );
};
