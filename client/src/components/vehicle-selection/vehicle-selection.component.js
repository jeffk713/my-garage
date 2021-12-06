import React from 'react';
import { withRouter } from 'react-router-dom';

import Banner from '../banner/banner.component';
import ImageDisplay from '../image-display/image-display.component';

import './vehicle-selection.styles.scss';

const VehicleSelection = ({
  vehicleId,
  nickname,
  history,
  match,
  vehicleImage,
}) => {
  return (
    <div
      className='vehicle-selection'
      onClick={() => history.push(`${match.url}/${vehicleId}`)}
    >
      <ImageDisplay
        option='no-border'
        vehicleImage={vehicleImage}
        vehicleId={vehicleId}
      />
      <Banner locatedIn='bnr-in-vehicle-selection' option='bottom'>
        {nickname}
      </Banner>
    </div>
  );
};

export default withRouter(VehicleSelection);
