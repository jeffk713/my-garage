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
      <Link linkName='My Page' urlToGo='/my-page' linkStyle='nav-link' />
      <Link linkName='Shops' urlToGo='/shops' linkStyle='nav-link' />
      <Link linkName='Sign In' urlToGo='/sign-in' linkStyle='nav-link' />
    </div>
  </div>
);

export default Navigator;
