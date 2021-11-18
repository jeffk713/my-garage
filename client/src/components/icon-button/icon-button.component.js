import React from 'react';

import './icon-button.styles.scss';
import BackArrow from '../../assets/images/back-arrow.svg';
import Add from '../../assets/images/add.svg';
import Edit from '../../assets/images/edit.svg';
import Delete from '../../assets/images/delete.svg';

const IconButton = ({ onClick, option }) => {
  let iconToDisplay;
  const styleOption = option;
  if (
    option === 'icon-back-btn-in-add-service' ||
    option === 'icon-back-btn-in-my-page'
  ) {
    iconToDisplay = BackArrow;
  }
  if (option === 'icon-add-vehicle-btn-in-my-page') {
    iconToDisplay = Add;
  }
  if (option === 'icon-edit-btn-in-service-item') {
    iconToDisplay = Edit;
  }

  if (option === 'icon-delete-btn-in-service-item') {
    iconToDisplay = Delete;
  }
  return (
    <div className={`icon-button-container ${styleOption}`} onClick={onClick}>
      <img src={iconToDisplay} alt='icon' />
    </div>
  );
};

export default IconButton;
