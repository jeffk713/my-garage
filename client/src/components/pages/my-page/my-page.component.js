import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';
import VehicleAddLink from '../../vehicle-add-link/vehicle-add-link.component';

import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';
import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';
import {
  selectIsAuth,
  selectUsername,
  selectUserId,
} from '../../../redux/user/user.selectors';

import './my-page.styles.scss';

const MyPage = ({
  vehicles,
  history,
  isAuth,
  username,
  userId,
  getUserVehiclesStartAsync,
}) => {
  useEffect(() => {
    getUserVehiclesStartAsync(userId);
  }, [userId, getUserVehiclesStartAsync]);

  if (!isAuth) return <Redirect to='/' />;

  return (
    <div className='my-page'>
      <Banner>Hello, {username}! Select your vehicle</Banner>
      <div className='vehicle-selection-container'>
        {vehicles.map(vehicle => (
          <VehicleSelection
            key={vehicle._id}
            vehicleId={vehicle._id}
            vehicleImage={vehicle.vehicleImage}
            nickname={vehicle.nickname}
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
  username: selectUsername,
  userId: selectUserId,
});

const mapDispatchToProps = dispatch => ({
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
