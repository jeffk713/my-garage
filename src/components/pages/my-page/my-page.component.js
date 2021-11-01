import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';

import './my-page.styles.scss';

const MyPage = () => (
  <div className='my-page'>
    <div className='my-page-header'>
      <h2 className='my-page-banner'>Hello, Jeff! Select your vehicle</h2>
      <CustomButton>
        <a href='/my-page/add-vehicle'>+</a>
      </CustomButton>
    </div>
    <div className='car-picture-container'>
      <div className='car-picture'>car pic</div>
      <div className='car-picture'>car pic</div>
    </div>
  </div>
);

export default MyPage;
