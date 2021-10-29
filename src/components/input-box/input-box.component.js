import React from 'react';

import './input-box.styles.scss';

const InputBox = ({ label, ...otherprops }) => (
  <div className='input-box'>
    <label>{label}</label>
    <input {...otherprops} />
  </div>
);

export default InputBox;
