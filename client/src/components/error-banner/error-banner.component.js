import React from 'react';

import './error-banner.styles.scss';

const ErrorBanner = ({ children, display }) => (
  <div
    className={`error-banner-container ${display && 'display-error-banner'}`}
  >
    <p className={`error-banner`}>{children}</p>
  </div>
);

export default ErrorBanner;
