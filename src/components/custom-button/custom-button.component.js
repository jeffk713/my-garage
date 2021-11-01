import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, ...otherProps }) => (
  <button className={`btn ${otherProps.locatedin}`} {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
