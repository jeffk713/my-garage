import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';

import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import { getVehicleArr } from '../../../redux/vehicle/vehicle.utils';

import './my-page.styles.scss';

const MyPage = ({ vehicles }) => {
  const vehicleArr = getVehicleArr(vehicles);
  return (
    <div className='my-page'>
      <div className='my-page-header'>
        <Banner locatedIn='bnr-in-my-page'>
          Hello, Jeff! Select your vehicle
        </Banner>
        <CustomButton>
          <a href='/my-page/add-vehicle'>Add</a>
        </CustomButton>
      </div>
      <div className='vehicle-selection-container'>
        {vehicleArr.map(vehicle => (
          <VehicleSelection
            key={vehicle._id}
            vehicleId={vehicle._id}
            vehicleImgUrl={vehicle.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
});

export default connect(mapStateToProps)(MyPage);
