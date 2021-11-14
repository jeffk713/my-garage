import React from 'react';

import './banner.styles.scss';

const Banner = ({ children, locatedIn, option }) => {
  let componentToRender;

  if (locatedIn === 'bnr-in-homepage') {
    componentToRender = <h1 className={`${locatedIn}`}>{children}</h1>;
  }

  if (locatedIn === 'bnr-in-vehicle-selection') {
    componentToRender = <p className={`${locatedIn}`}>{children}</p>;
  }

  return (
    <div className={`banner-container ${option}`}>
      {locatedIn ? componentToRender : <h2>{children}</h2>}
    </div>
  );
};

export default Banner;
