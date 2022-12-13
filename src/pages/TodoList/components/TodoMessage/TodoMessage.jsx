import * as React from 'react';
import PropTypes from 'prop-types';

export const TodoMessage = ({ messageClassName, messageName }) => (
  <h4 className={messageClassName}>{messageName}</h4>
);

TodoMessage.propTypes = {
  messageName: PropTypes.string.isRequired,
  messageClassName: PropTypes.string.isRequired,
};
