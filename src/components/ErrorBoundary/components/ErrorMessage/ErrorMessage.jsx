import errorImg from './assets/error.svg';

import './index.scss';

export const ErrorMessage = () => (
  <>
    <img className="error-img" src={errorImg} alt="Error" />
    <h3 className="error-message">Something Went Wrong </h3>
    <h3 className="error-message">Please Try Again</h3>
  </>
);
