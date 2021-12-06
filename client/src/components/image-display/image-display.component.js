import React from 'react';

import './image-display.styles.scss';
import defaultVehicleImage from '../../assets/images/default-vehicle-image.svg';

const ImageDisplay = ({ vehicleImage, vehicleId, option }) => {
  return (
    <div className={`vehicle-image-container ${option}`}>
      {vehicleImage ? (
        <div
        className='image-display'
          style={{
            backgroundImage: `url(/api/vehicle/vehicle-image/${vehicleId})`,
          }}
        />
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
