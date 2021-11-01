import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';

import './homepage.styles.scss';

const Homepage = ({ history }) => {
  return (
    <div className='homepage'>
      <div className='homepage-banner'>
        <h1 className='banner-title'>Manage your vehicles at your click</h1>
        <CustomButton onClick={() => history.push('/sign-in')}>
          Sign In
        </CustomButton>
        <Link
          linkStyle='inline-link'
          linkName='You are not registered yet? Sign up here!'
          urlToGo='/sign-up'
        />
      </div>
    </div>
  );
};
export default Homepage;
