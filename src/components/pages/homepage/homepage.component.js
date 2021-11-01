import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';

import './homepage.styles.scss';

const Homepage = () => (
  <div className='homepage'>
    <div className='homepage-banner'>
      <h1 className='banner-title'>Manage your vehicles at your click</h1>
      <CustomButton className='btn'>sign in or up</CustomButton>
    </div>
  </div>
);

export default Homepage;
