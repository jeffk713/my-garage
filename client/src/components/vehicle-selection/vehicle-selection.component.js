import React from 'react';
import { withRouter } from 'react-router-dom';

import Banner from '../banner/banner.component';
import ImageDisplay from '../image-display/image-display.component';

import './vehicle-selection.styles.scss';

const VehicleSelection = ({ vehicleId, history, match, imageUrl }) => {
  return (
    <div
      className='vehicle-selection'
      onClick={() => history.push(`${match.url}/${vehicleId}`)}
    >
      <ImageDisplay
        option='no-border'
        imageUrl={imageUrl}
      />
      <Banner locatedIn='bnr-in-vehicle-selection' option='bottom'>
        Corolla
      </Banner>
    </div>
  );
};

export default withRouter(VehicleSelection);
