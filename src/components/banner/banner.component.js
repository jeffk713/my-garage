import React from 'react';

import './banner.styles.scss';

const Banner = ({ children, locatedIn }) => (
  <div className='banner-container'>
    {locatedIn ? (
      <h1 className={`${locatedIn}`}>{children}</h1>
    ) : (
      <h2>{children}</h2>
    )}
  </div>
);

export default Banner;
