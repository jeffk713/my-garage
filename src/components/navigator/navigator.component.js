import React from 'react';

import Link from '../link/link.component';

import './navigator.styles.scss';

const Navigator = () => (
  <div className='navigator'>
    <div className='logo'>
      <h1>LOGO</h1>
    </div>
    <div className='link-container'>
      <Link>
        <a href='/'>my page</a>
      </Link>
      <Link>
        <a href='/'>shops</a>
      </Link>
      <Link>
        <a href='/'>sign in/up</a>
      </Link>
    </div>
  </div>
);

export default Navigator;
