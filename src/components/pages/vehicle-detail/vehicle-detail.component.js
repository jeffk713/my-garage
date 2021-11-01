import React from 'react';

import './vehicle-detail.styles.scss';

const VehicleDetailPage = ({ match }) => {
  console.log(match);
  return <div>ID: {match.params.vehicleId}</div>;
};

export default VehicleDetailPage;
