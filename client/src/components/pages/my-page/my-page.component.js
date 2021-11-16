import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';
import VehicleAddLink from '../../vehicle-add-link/vehicle-add-link.component';

import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';
import { selectIsAuth } from '../../../redux/user/user.selectors';

import { getVehicleArr } from '../../../redux/vehicle/vehicle.utils';

import './my-page.styles.scss';

const MyPage = ({ vehicles, history, isAuth }) => {
  const vehicleArr = getVehicleArr(vehicles);

  // if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='my-page'>
      <Banner>Hello, Jeff! Select your vehicle</Banner>
      <div className='vehicle-selection-container'>
        {vehicleArr.map(vehicle => (
          <VehicleSelection
            key={vehicle._id}
            vehicleId={vehicle._id}
            imageUrl={vehicle.imageUrl}
          />
        ))}
        <VehicleAddLink
          handleClick={() => history.push('/my-page/add-vehicle')}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
  isAuth: selectIsAuth,
});

export default connect(mapStateToProps)(MyPage);
