import React from 'react';

import './my-page.styles.scss';

const MyPage = () => (
  <div className='my-page'>
    <div className='my-page-header'>
      <h2 className='my-page-greeting'>Hello, Jeff! Select your vehicle</h2>
      <button className='btn'>+</button>
    </div>
    <div className='car-picture-container'>
      <div className='car-picture'>car pic</div>
      <div className='car-picture'>car pic</div>
    </div>
  </div>
);

export default MyPage;
