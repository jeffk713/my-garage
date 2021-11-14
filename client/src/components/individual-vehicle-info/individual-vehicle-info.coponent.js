import React from 'react';

import './individual-vehicle-info.styles.scss';

const IndividualVehicleInfo = ({ vehicleInfo, value }) => (
  <p className='vehicle-info'>
    {vehicleInfo} : <b className='vehicle-info-value'>{value}</b>
  </p>
);

export default IndividualVehicleInfo;
