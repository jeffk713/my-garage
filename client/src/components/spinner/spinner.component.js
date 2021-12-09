import React from 'react';

import './spinner.styles.scss';

const Spinner = ({ spinnerOption }) => {
  return (
    <div className={`spinner-overlay ${spinnerOption}`}>
      <div className='spinner-container' />
    </div>
  );
};

export default Spinner;
