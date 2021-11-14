import React from 'react';

import './image-input-box.styles.scss';

const ImageInputBox = ({ imageUrl, ...otherProps }) => (
  <div className='vehicle-image-input-box'>
    <div className='vehicle-image'>
      {imageUrl ? (
        <img src={imageUrl} alt='vehicle-img-to-add' />
      ) : (
        <div className='no-image-sign'>
          <p>No Image Selected</p>
        </div>
      )}
    </div>
    <label className='file-input-label'>
      Choose Picture
      <input className='file-input' {...otherProps} />
    </label>
  </div>
);

export default ImageInputBox;
