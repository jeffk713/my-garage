import React from 'react';

import './link.styles.scss';

const Link = ({ linkName, urlToGo }) => (
  <div className='link'>
    <a href={urlToGo}>{linkName}</a>
  </div>
);

export default Link;
