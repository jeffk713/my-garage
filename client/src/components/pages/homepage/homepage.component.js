import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';
import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';

import './homepage.styles.scss';

const Homepage = ({ history }) => {
  return (
    <div className='homepage'>
      <div className='homepage-banner'>
        <Banner locatedIn='bnr-in-homepage'>
          Manage Your Vehicles At Your Click
        </Banner>
        <CustomButton
          locatedIn='btn-in-homepage'
          onClick={() => history.push('/sign-in')}
        >
          Sign In
        </CustomButton>
        <Link
          linkStyle='inline-link'
          linkName='Sign up here!'
          urlToGo='/sign-up'
        />
      </div>
    </div>
  );
};
export default Homepage;
