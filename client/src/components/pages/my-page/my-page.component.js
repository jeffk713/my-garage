import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';

import { getVehicleArr } from '../../../redux/user-data/user-data.utils';

import './my-page.styles.scss';

const MyPage = ({ vehicleObj }) => {
  const vehicleArr = getVehicleArr(vehicleObj);
  return (
    <div className='my-page'>
      <div className='my-page-header'>
        <Banner locatedIn='bnr-in-my-page'>
          Hello, Jeff! Select your vehicle
        </Banner>
        <CustomButton>
          <a href='/my-page/add-vehicle'>+</a>
        </CustomButton>
      </div>
      <div className='vehicle-selection-container'>
        {vehicleArr.map(vehicle => (
          <VehicleSelection
            key={vehicle.id}
            vehicleId={vehicle.id}
            vehicleImgUrl={vehicle.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  vehicleObj: state.userData.vehicles,
});

export default connect(mapStateToProps)(MyPage);
