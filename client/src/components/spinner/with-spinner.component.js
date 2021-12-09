import React from 'react';

import Spinner from './spinner.component';

const WithSpinner =
  PassedInComponent =>
  ({ isLoading, spinnerOption, ...otherProps }) => {
    return isLoading ? (
      <Spinner spinnerOption={spinnerOption} />
    ) : (
      <PassedInComponent {...otherProps} />
    );
  };

export default WithSpinner;
