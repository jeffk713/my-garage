import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';

import './homepage.styles.scss';

const Homepage = () => (
  <div className='homepage'>
    <div className='homepage-banner'>
      <h1 className='banner-title'>Manage your vehicles at your click</h1>
      <CustomButton>sign in or up</CustomButton>
      <Link
        linkStyle='inline-link'
        linkName='you are not registered yet? sign up here!'
        urlToGo='/sign-up'
      />
    </div>
  </div>
);

export default Homepage;
