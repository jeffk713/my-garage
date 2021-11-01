import React from 'react';
import { withRouter } from 'react-router-dom';

import './vehicle-selection.styles.scss';

const VehicleSelection = ({ vehicleId, history, match }) => (
  <div
    className='vehicle-selection'
    onClick={() => history.push(`${match.url}/${vehicleId}`)}
  >
    vehicle
  </div>
);

export default withRouter(VehicleSelection);
