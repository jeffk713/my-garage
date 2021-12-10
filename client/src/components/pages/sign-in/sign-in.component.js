import React from 'react';

import Link from '../../link/link.component';
import Banner from '../../banner/banner.component';
import SignInForm from '../../sign-in-form/sign-in-form.component';

import './sign-in.styles.scss';

const SignInPage = () => {
  return (
    <div className='sign-in-page'>
      <Banner>Welcome Back, Please Sign In!</Banner>
      <SignInForm />
      <Link
        linkStyle='inline-link'
        linkName='Sign up here!'
        urlToGo='/sign-up'
      />
    </div>
  );
};

export default SignInPage;
