import React from 'react';
import { connect } from 'react-redux';

import './vehicle-detail.styles.scss';

const VehicleDetailPage = ({ match, vehicleObj }) => {
  const vehicleToShow = vehicleObj[match.params.vehicleId];
  return (
    <div>
      <p>ID: {vehicleToShow.id}</p>
      <p>Nickname: {vehicleToShow.nickname}</p>
      <p>make: {vehicleToShow.make}</p>
      <p>model: {vehicleToShow.model}</p>
      <p>year: {vehicleToShow.year}</p>
      <p>imageUrl: {vehicleToShow.imageUrl}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  vehicleObj: state.vehicle,
});

export default connect(mapStateToProps)(VehicleDetailPage);
