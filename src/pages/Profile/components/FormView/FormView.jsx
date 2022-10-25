import { useHistory } from 'react-router-dom';

import { ProfileForm } from '../ProfileForm';
import { Routes } from '../../../../routes/constants';

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
