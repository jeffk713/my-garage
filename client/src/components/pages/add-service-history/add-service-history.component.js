import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import ServiceNote from '../../service-note/service-note.component';
import IconButton from '../../icon-button/icon-button.component';

import { selectUserId, selectIsAuth } from '../../../redux/user/user.selectors';
import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import {
  addServiceHistoryStartAsync,
  getUserVehiclesStartAsync,
} from '../../../redux/vehicle/vehicle.actions';

import { getPreviousURL } from '../../../utils/url-utils';
import {
  getVehicleWithId,
  getVehicleServiceWithId,
} from '../../../utils/vehicle-utils';
import { getDateFormat } from '../../../utils/date-utils';

import './add-service-history.styles.scss';

const AddServiceHistoryPage = ({
  history,
  match,
  addServiceHistoryStartAsync,
  getUserVehiclesStartAsync,
  isAuth,
  userId,
  vehicles,
}) => {
  let INITIAL_INPUT = {
    serviceName: '',
    mileage: '',
    date: '',
    note: '',
  };
  const existingService = getVehicleServiceWithId(
    getVehicleWithId(vehicles, match.params.vehicleId).serviceHistory,
    match.params.serviceId
  );
  if (existingService) {
    INITIAL_INPUT = {
      ...existingService,
      mileage: existingService.mileage.toString(),
      date: getDateFormat(existingService.date),
    };
  }

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { serviceName, mileage, date, note } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();

    let requestURL;
    if (existingService) {
      // to update service
    } else {
      requestURL = `/api/vehicle/${match.params.vehicleId}/add-service`;
      await addServiceHistoryStartAsync(
        requestURL,
        serviceName,
        mileage,
        date,
        note
      );
    }

    setInputState({ ...INITIAL_INPUT });

    await getUserVehiclesStartAsync(userId);

    history.push(`/my-page/${match.params.vehicleId}`);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  if (!isAuth) return <Redirect to='/' />;
  return (
    <div className='add-servcie-history'>
      <IconButton
        option='icon-back-btn-in-add-service'
        onClick={() => history.push(getPreviousURL(match.url))}
      />
      <Banner>Add Service History</Banner>
      <form onSubmit={handleSubmit}>
        <InputBox
          label='Service name'
          type='string'
          name='serviceName'
          value={serviceName}
          onChange={handleChange}
          required
        />
        <InputBox
          label='Mileage'
          type='string'
          name='mileage'
          value={mileage}
          onChange={handleChange}
          required
        />
        <InputBox
          label='Date'
          type='date'
          name='date'
          value={date}
          onChange={handleChange}
          dateLabel
          required
        />
        <ServiceNote
          label='Note'
          name='note'
          value={note}
          onChange={handleChange}
        />
        {existingService ? (
          <CustomButton>UPDATE</CustomButton>
        ) : (
          <CustomButton>ADD</CustomButton>
        )}
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  isAuth: selectIsAuth,
  vehicles: selectVehicles,
});

const mapDispatchToProps = dispatch => ({
  addServiceHistoryStartAsync: (requestURL, serviceName, mileage, date, note) =>
    dispatch(
      addServiceHistoryStartAsync(requestURL, serviceName, mileage, date, note)
    ),
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServiceHistoryPage);
