import React from 'react';

import './image-input-box.styles.scss';

const ImageInputBox = ({ ...props }) => (
  <div className='vehicle-image-input-box'>
    <div className='vehicle-image'>vehicle image</div>
    <input {...props} />
  </div>
);

export default ImageInputBox;
