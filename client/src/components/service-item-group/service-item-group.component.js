import React from 'react';

import IconButton from '../icon-button/icon-button.component';

import { getConvertedDate } from '../../utils/date-utils';

import './service-item-group.styles.scss';

const ServiceItemGroup = ({ serviceName, mileage, date, onClick }) => (
  <div className='service-item-group'>
    <p className='service-item service-name'>{serviceName}</p>
    <p className='service-item'>{mileage}</p>
    <p className='service-item'>{getConvertedDate(date)}</p>
    <div className='service-item button-group-in-service-item'>
      <IconButton option='icon-edit-btn-in-service-item' onClick={onClick} />
      <IconButton option='icon-delete-btn-in-service-item' onClick={onClick} />
    </div>
  </div>
);

export default ServiceItemGroup;
