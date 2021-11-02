import React from 'react';

import './link.styles.scss';

const Link = ({ linkName, urlToGo, linkStyle }) => (
  <div className={`${linkStyle}`}>
    <a href={urlToGo}>{linkName}</a>
  </div>
);

export default Link;
