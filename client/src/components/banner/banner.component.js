import React from 'react';

import './banner.styles.scss';

const Banner = ({ children, locatedIn }) => (
  <div className='banner-container'>
    {locatedIn === 'bnr-in-homepage' ? (
      <h1 className={`${locatedIn}`}>{children}</h1>
    ) : (
      <h2 className={`${locatedIn}`}>{children}</h2>
    )}
  </div>
);

export default Banner;
