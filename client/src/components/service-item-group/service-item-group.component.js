import React from 'react';

import IconButton from '../icon-button/icon-button.component';

import './service-item-group.styles.scss';

const ServiceItemGroup = ({ id, name, mileage, date, onClick }) => (
  <div className='service-item-group'>
    <p className='service-item service-name'>spark plugs replacement</p>
    <p className='service-item'>32000</p>
    <p className='service-item'>Oct 21 2021</p>
    <div className='service-item button-group-in-service-item'>
      <IconButton option='edit-btn-in-service-item' onClick={onClick} />
      <IconButton option='delete-btn-in-service-item' onClick={onClick} />
    </div>
  </div>
);

export default ServiceItemGroup;
