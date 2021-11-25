import React from 'react';

import './error-banner.styles.scss';

const ErrorBanner = ({ children }) => (
  <div className='error-banner-container hidden-error-banner'>
    <p className='error-banner'>{children}</p>
  </div>
);

export default ErrorBanner;
