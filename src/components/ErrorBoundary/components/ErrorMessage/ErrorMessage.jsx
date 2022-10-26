import img from './assets/error.gif';

export const ErrorMessage = () => (
  <img
    style={{ display: 'block', width: 250, height: 250, objectFit: 'contain', margin: '0 auto' }}
    src={img}
    alt="Error"
  />
);
