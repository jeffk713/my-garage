import React from 'react';
import { withRouter } from 'react-router';

import './vehicle-add-link.styles.scss';

const VehicleAddLink = ({ history }) => (
  <div
    className='add-vehicle-link'
    onClick={() => history.push('/my-page/add-vehicle')}
  >
    <div className='add-link-sign'>+</div>
  </div>
);

export default withRouter(VehicleAddLink);
