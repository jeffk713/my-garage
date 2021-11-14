import React from 'react';

import './input-box.styles.scss';

const InputBox = ({ label, locatedIn, dateLabel, ...otherProps }) => (
  <div className={`input-box ${locatedIn && 'short'}`}>
    <input {...otherProps} />
    <label
      className={` input-label ${dateLabel && 'date-label shrink'} ${
        otherProps.value.length ? 'shrink' : ''
      }`}
    >
      {label}
    </label>
  </div>
);

export default InputBox;
