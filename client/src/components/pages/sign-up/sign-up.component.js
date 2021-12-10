import React from 'react';

import Banner from '../../banner/banner.component';
import SignUpForm from '../../sign-up-form/sign-up-form.component';

import './sign-up.styles.scss';

const SignUpPage = () => {
  return (
    <div className='sign-up-page'>
      <Banner>Welcome, Please Sign Up!</Banner>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
