import React from 'react';

import './input-box.styles.scss';

const InputBox = ({ label, ...otherprops }) => (
  <div className='input-box'>
    <input {...otherprops} />
    <label
      className={`${otherprops.value.length ? 'shrink' : ''} input-label`}
    >
      {label}
    </label>
  </div>
);

export default InputBox;
