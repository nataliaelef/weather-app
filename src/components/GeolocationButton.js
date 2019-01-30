import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GeolocationButton = props => {
  let { handleClick, id } = props;
  return (
    <span
      onClick={() => {
        handleClick(id);
      }}
      id={id}
    >
      <FontAwesomeIcon icon="compass" />
    </span>
  );
};

export default GeolocationButton;
