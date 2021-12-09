import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import ServiceNote from '../../service-note/service-note.component';
import IconButton from '../../icon-button/icon-button.component';

import { selectUserId } from '../../../redux/user/user.selectors';
import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import {
  addServiceHistoryStartAsync,
  updateServiceHistoryStartAsync,
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
  updateServiceHistoryStartAsync,
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
      requestURL = `/api/vehicle/${match.params.vehicleId}/${existingService._id}`;
      await updateServiceHistoryStartAsync({
        requestURL,
        serviceName,
        mileage,
        date,
        note,
        userId,
      });
    } else {
      requestURL = `/api/vehicle/${match.params.vehicleId}/add-service`;
      await addServiceHistoryStartAsync({
        requestURL,
        serviceName,
        mileage,
        date,
        note,
        userId,
      });
    }

    setInputState({ ...INITIAL_INPUT });
    history.push(`/my-page/${match.params.vehicleId}`);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

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
        <CustomButton>{existingService ? 'UPDATE' : 'ADD'}</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  vehicles: selectVehicles,
});

const mapDispatchToProps = dispatch => ({
  addServiceHistoryStartAsync: serviceHistoryInfo =>
    dispatch(addServiceHistoryStartAsync(serviceHistoryInfo)),
  updateServiceHistoryStartAsync: serviceHistoryInfo =>
    dispatch(updateServiceHistoryStartAsync(serviceHistoryInfo)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddServiceHistoryPage);
