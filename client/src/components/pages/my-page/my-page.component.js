import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Banner from '../../banner/banner.component';
import VehicleSelection from '../../vehicle-selection/vehicle-selection.component';
import VehicleAddLink from '../../vehicle-add-link/vehicle-add-link.component';

import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';
import {
  selectIsAuth,
  selectUsername,
} from '../../../redux/user/user.selectors';

import './my-page.styles.scss';

const MyPage = ({ vehicles, history, isAuth, username }) => {
  if (!isAuth) return <Redirect to='/' />;

  // const imgConvert = arrayBuffer => {
  //   if (!arrayBuffer) return null;
  //   console.log(arrayBuffer);

  //   const blob = new Blob([arrayBuffer]);
  //   const srcBlob = URL.createObjectURL(blob);

  //   return srcBlob;
  // };

  return (
    <div className='my-page'>
      <Banner>Hello, {username}! Select your vehicle</Banner>
      <div className='vehicle-selection-container'>
        {vehicles.map(vehicle => (
          <VehicleSelection
            key={vehicle._id}
            vehicleId={vehicle._id}
            vehicleImage={undefined}
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
});

export default connect(mapStateToProps)(MyPage);
