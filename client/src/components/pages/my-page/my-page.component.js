import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Banner from '../../banner/banner.component';
import WithSpinner from '../../spinner/with-spinner.component';
import VehicleSelectionContainer from '../../vehicle-selection-container/vehicle-selection-container.component';

import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';
import {
  selectIsAuth,
  selectUsername,
  selectUserId,
} from '../../../redux/user/user.selectors';
import { selectIsLoading } from '../../../redux/vehicle/vehicle.selectors';

import './my-page.styles.scss';

const VehicleSelectioncontainerWithSpinner = WithSpinner(
  VehicleSelectionContainer
);

const MyPage = ({
  isAuth,
  username,
  userId,
  isLoading,
  getUserVehiclesStartAsync,
}) => {
  useEffect(() => {
    getUserVehiclesStartAsync(userId);
  }, [userId, getUserVehiclesStartAsync]);

  if (!isAuth) return <Redirect to='/' />;

  return (
    <div className='my-page'>
      <Banner>
        {isLoading
          ? `Loading your vehicles...`
          : `Hello, ${username}! Select your vehicle`}
      </Banner>
      <VehicleSelectioncontainerWithSpinner isLoading={isLoading} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
  username: selectUsername,
  userId: selectUserId,
  isLoading: selectIsLoading,
});

const mapDispatchToProps = dispatch => ({
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
