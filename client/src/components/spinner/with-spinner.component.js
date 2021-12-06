import React from 'react';

import Spinner from './spinner.component';

const WithSpinner =
  PassedInComponent =>
  ({ isLoading, ...otherProps }) => {
    return isLoading ? <Spinner /> : <PassedInComponent {...otherProps} />;
  };

export default WithSpinner;
