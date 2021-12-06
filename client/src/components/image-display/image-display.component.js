import React from 'react';

import './image-display.styles.scss';
import defaultVehicleImage from '../../assets/images/default-vehicle-image.svg';

const ImageDisplay = ({ vehicleImage, vehicleId, option }) => {
  return (
    <div className={`vehicle-image-container ${option}`}>
      {vehicleImage ? (
        <img src={`/api/vehicle/vehicle-image/${vehicleId}`} alt='vehicle' />
      ) : (
        <img
          className='default-image'
          src={defaultVehicleImage}
          alt='default'
        />
      )}
    </div>
  );
};

export default ImageDisplay;
