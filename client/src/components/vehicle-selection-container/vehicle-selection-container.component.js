import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import VehicleSelection from '../vehicle-selection/vehicle-selection.component';
import VehicleAddLink from '../vehicle-add-link/vehicle-add-link.component';

import { selectVehicles } from '../../redux/vehicle/vehicle.selectors';

import './vehicle-selection-container.styles.scss';

const VehicleSelectionContainer = ({ vehicles }) => {
  return (
    <div className='vehicle-selection-container'>
      {vehicles.map(vehicle => (
        <VehicleSelection
          key={vehicle._id}
          vehicleId={vehicle._id}
          vehicleImage={vehicle.vehicleImage}
          nickname={vehicle.nickname}
        />
      ))}
      <VehicleAddLink />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
});

export default connect(mapStateToProps)(VehicleSelectionContainer);
