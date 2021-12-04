import React from 'react';

import './image-display.styles.scss';
import defaultVehicleImage from '../../assets/images/default-vehicle-image.svg';

const ImageDisplay = ({ vehicleImage, option }) => {
  console.log(vehicleImage);
  let blob;
  if (vehicleImage) {
    blob = new Blob([vehicleImage.data]);
  }
  return (
    <div className={`vehicle-image-container ${option}`}>
      {vehicleImage ? (
        <img src={URL.createObjectURL(blob)} alt='vehicle' />
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
