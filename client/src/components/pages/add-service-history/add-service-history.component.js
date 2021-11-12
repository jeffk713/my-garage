import React, { useState } from 'react';

import axios from 'axios';

import InputBox from '../../input-box/input-box.component';
import CustomButton from '../../custom-button/custom-button.component';

import './add-service-history.styles.scss';

const INITIAL_INPUT = {
  serviceName: '',
  mileage: '',
  date: '',
  note: '',
};

const AddServiceHistoryPage = ({ history, match }) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { serviceName, mileage, date, note } = inputState;
  const handleSubmit = async e => {
    e.preventDefault();

    const serviceHistory = { ...inputState };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(serviceHistory);

    try {
      const serviceHistoryArr = await axios
        .put(`/api/vehicle/${match.params.vehicleId}/add-service`, body, config)
        .then(res => res.data);
      console.log(serviceHistoryArr);

      setInputState({ ...INITIAL_INPUT });

      history.push(`/my-page/${match.params.vehicleId}`);
    } catch (err) {
      alert('Service update has failed');
      console.error('ERROR UPON SERVICE HISTORY UPDATE:', err.message);
    }
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  return (
    <div>
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
          required
        />
        <textarea name='note' value={note} onChange={handleChange} />
        <CustomButton>ADD</CustomButton>
      </form>
    </div>
  );
};

export default AddServiceHistoryPage;
