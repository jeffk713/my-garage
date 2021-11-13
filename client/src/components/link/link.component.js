import React from 'react';

import './link.styles.scss';

const Link = ({ linkName, urlToGo, linkStyle }) => (
  <div className={`${linkStyle}`}>
    {urlToGo === '/sign-up' ? (
      <div>
        <p>Not registered yet?</p>
        <a href={urlToGo}>{linkName}</a>
      </div>
    ) : (
      <a href={urlToGo}>{linkName}</a>
    )}
  </div>
);

export default Link;
