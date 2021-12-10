import React from 'react';

import InputBox from '../input-box/input-box.component';
import ServiceNote from '../service-note/service-note.component';

import { getDateFormat } from '../../utils/date-utils';

import './service-detail-popup.styles.scss';

const ServiceDetailPopup = ({
  serviceToDisplay: { serviceName, mileage, date, note },
  setServiceToDisplay,
}) => {
  const INITIAL_SERVICE = {
    date: '',
    mileage: '',
    note: '',
    serviceName: '',
  };

  return (
    <div className='popup-container'>
      <div
        className='service-detail-popup-overlay'
        onClick={() => setServiceToDisplay(INITIAL_SERVICE)}
      />
      <div className='service-detail-popup'>
        <InputBox
          label='Service name'
          type='string'
          name='serviceName'
          value={serviceName}
          autocomplete={false}
        />
        <InputBox
          label='Mileage'
          type='string'
          name='mileage'
          value={mileage.toString()}
          autocomplete={false}
        />
        <InputBox
          label='Date'
          type='date'
          name='date'
          value={getDateFormat(date)}
          dateLabel
          autocomplete={false}
        />
        <ServiceNote label='Note' name='note' value={note} />
      </div>
    </div>
  );
};

export default ServiceDetailPopup;
