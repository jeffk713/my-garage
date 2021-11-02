import React from 'react';

import './image-input-box.styles.scss';

const ImageInputBox = ({ imageFile, ...props }) => (
  <div className='vehicle-image-input-box'>
    <div className='vehicle-image' >
      <img src={imageFile} alt='vehicle-img-to-add' />
    </div>
    <input {...props} />
  </div>
);

export default ImageInputBox;
