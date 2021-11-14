import React from 'react';

import './service-note.styles.scss';

const ServiceNote = ({ label, ...otherProps }) => (
  <div className='service-note-box'>
    <label>{label}</label>
    <textarea className='service-note' {...otherProps} />
  </div>
);

export default ServiceNote;
