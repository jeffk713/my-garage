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
      <Link linkName='my page' urlToGo='/my-page' />
      <Link linkName='shops' urlToGo='/shops' />
      <Link linkName='sign in/up' urlToGo='/sign' />
    </div>
  </div>
);

export default Navigator;
