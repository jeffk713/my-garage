import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, locatedIn, ...otherProps }) => (
  <button className={`btn ${locatedIn}`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
