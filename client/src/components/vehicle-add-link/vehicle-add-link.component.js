import React from 'react';

import './vehicle-add-link.styles.scss';

const VehicleAddLink = ({ handleClick }) => (
  <div className='add-vehicle-link' onClick={handleClick}>
    <div className='add-link-sign'>+</div>
  </div>
);

export default VehicleAddLink;
