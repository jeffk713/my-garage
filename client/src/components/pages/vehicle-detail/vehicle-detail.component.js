import React from 'react';
import { connect } from 'react-redux';

import './vehicle-detail.styles.scss';

const VehicleDetailPage = ({ match, vehicleObj }) => {
  const vehicleToShow = vehicleObj[match.params.vehicleId];
  return (
    <div className='vehicle-detail-page'>
      <div className='vehicle-basic-info'>
        <div className='vehicle-image-container'>
          <p>{vehicleToShow.imageUrl}</p>
          <p>img</p>
        </div>
        <div className='vehicle-info-container'>
          <h5>Nickname: {vehicleToShow.nickname}</h5>
          <h5>make: {vehicleToShow.make}</h5>
          <h5>model: {vehicleToShow.model}</h5>
          <h5>year: {vehicleToShow.year}</h5>
        </div>
      </div>
      <div className='vehicle-service-info'>
        <div className='service-table-label'>
          <h5>service</h5>
          <h5>mileage</h5>
          <h5>date</h5>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  vehicleObj: state.vehicle,
});

export default connect(mapStateToProps)(VehicleDetailPage);
