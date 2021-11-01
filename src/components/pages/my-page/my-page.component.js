import React from 'react';

import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';

import './my-page.styles.scss';

const MyPage = () => (
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
      {[
        {
          id: 1,
          nickname: 'car1',
          make: 'Toyota',
          model: 'Corolla',
          year: '1995',
        },
        {
          id: 2,
          nickname: 'car2',
          make: 'BMW',
          model: '328xi',
          year: '2011',
        },
      ].map(vehicle => (
        <VehicleSelection key={vehicle.id} vehicleId={vehicle.id} />
      ))}
    </div>
  </div>
);

export default MyPage;
