import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Banner from '../../banner/banner.component';
import WithSpinner from '../../spinner/with-spinner.component';
import VehicleSelectionContainer from '../../vehicle-selection-container/vehicle-selection-container.component';

import { selectUsername } from '../../../redux/user/user.selectors';
import { selectIsLoading } from '../../../redux/vehicle/vehicle.selectors';

import './my-page.styles.scss';

const VehicleSelectioncontainerWithSpinner = WithSpinner(
  VehicleSelectionContainer
);

const MyPage = ({ username, isLoading }) => {
  return (
    <div className='my-page'>
      <Banner>
        {isLoading
          ? `Loading Vehicles...`
          : `Hello, ${username}! Select Your Vehicle`}
      </Banner>
      <VehicleSelectioncontainerWithSpinner isLoading={isLoading} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  username: selectUsername,
  isLoading: selectIsLoading,
});

export default connect(mapStateToProps)(MyPage);
