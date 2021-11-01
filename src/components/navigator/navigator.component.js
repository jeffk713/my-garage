import React from 'react';

import Link from '../link/link.component';

import './navigator.styles.scss';

const Navigator = () => (
  <div className='navigator'>
    <div className='logo'>
      <a href='/'>
        <h1>LOGO</h1>
      </a>
    </div>
    <div className='link-container'>
      <Link linkName='My Page' urlToGo='/my-page' />
      <Link linkName='Shops' urlToGo='/shops' />
      <Link linkName='Sign In' urlToGo='/sign-in' />
    </div>
  </div>
);

export default Navigator;
