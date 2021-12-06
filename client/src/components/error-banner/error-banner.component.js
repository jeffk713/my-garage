import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectErrorMessage } from '../../redux/error/error.selectors';

import './error-banner.styles.scss';

const ErrorBanner = ({ errorMessage }) => (
  <div
    className={`error-banner-container ${
      errorMessage && 'display-error-banner'
    }`}
  >
    <p className={`error-banner`}>{errorMessage}</p>
  </div>
);

const mapStateToProps = createStructuredSelector({
  errorMessage: selectErrorMessage,
});

export default connect(mapStateToProps)(ErrorBanner);
