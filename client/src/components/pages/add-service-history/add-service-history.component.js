import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';
import ServiceNote from '../../service-note/service-note.component';
import IconButton from '../../icon-button/icon-button.component';

import { selectUserId } from '../../../redux/user/user.selectors';

import {
  addServiceHistoryStartAsync,
  getUserVehiclesStartAsync,
} from '../../../redux/vehicle/vehicle.actions';

import { getPreviousURL } from '../../../utils/url-utils';

import './add-service-history.styles.scss';

const INITIAL_INPUT = {
  serviceName: '',
  mileage: '',
  date: '',
  note: '',
};

const AddServiceHistoryPage = ({
  history,
  match,
  addServiceHistoryStartAsync,
  getUserVehiclesStartAsync,
  userId,
}) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { serviceName, mileage, date, note } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();

    const requestURL = `/api/vehicle/${match.params.vehicleId}/add-service`;
    const addServiceHistorySuccess = await addServiceHistoryStartAsync(
      requestURL,
      serviceName,
      mileage,
      date,
      note
    );

    if (!addServiceHistorySuccess) {
      return console.error('ERROR UPON ADD SERVICE HISTORY');
    }

    setInputState({ ...INITIAL_INPUT });

    const vehicles = await getUserVehiclesStartAsync(userId);
    if (!vehicles) {
      return console.error('ERROR UPON VEHICLE LOADING');
    }

    history.push(`/my-page/${match.params.vehicleId}`);
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div className='add-servcie-history'>
      <IconButton
        option='back-btn-in-add-service'
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
        <CustomButton>ADD</CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
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
