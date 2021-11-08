import React from 'react';

import './image-input-box.styles.scss';

const ImageInputBox = ({ imageUrl, ...props }) => (
  <div className='vehicle-image-input-box'>
    <div className='vehicle-image'>
      <img src={imageUrl} alt='vehicle-img-to-add' />
    </div>
    <input {...props} />
  </div>
);

export default ImageInputBox;
