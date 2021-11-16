import React from 'react';

import './image-display.styles.scss';
import defaultVehicleImage from '../../assets/images/default-vehicle-image.svg';

const ImageDisplay = ({ imageUrl, option }) => (
  <div className={`vehicle-image-container ${option}`}>
    {imageUrl ? (
      <img src={imageUrl} alt='default' />
    ) : (
      <img className='default-image' src={defaultVehicleImage} alt='default' />
    )}
  </div>
);

export default ImageDisplay;
