import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import InputBox from '../input-box/input-box.component';
import ImageInputBox from '../image-input-box/image-input-box.component';
import CustomButton from '../custom-button/custom-button.component';

import { selectUserId } from '../../redux/user/user.selectors';
import { selectVehicles } from '../../redux/vehicle/vehicle.selectors';

import {
  addVehicleStartAsync,
  updateVehicleStartAsync,
  delectVehicleStartAsync,
} from '../../redux/vehicle/vehicle.thunk-actions';

import { getVehicleWithId } from '../../utils/vehicle-utils';

import './add-update-vehicle-form.styles.scss';

const AddUpdateVehicleForm = ({
  addVehicleStartAsync,
  updateVehicleStartAsync,
  delectVehicleStartAsync,
  history,
  match,
  userId,
  vehicles,
}) => {
  let INITIAL_INPUT = {
    nickname: '',
    year: '',
    make: '',
    model: '',
    imageFile: null,
  };

  const existingVehicle = getVehicleWithId(vehicles, match.params.vehicleId);
  // if existingVehicle, use existing vehicle info
  if (existingVehicle) {
    INITIAL_INPUT = { ...existingVehicle };
  }

  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { nickname, make, model, year, imageFile } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();

    if (existingVehicle) {
      // if existingVehicle, edit it
      await updateVehicleStartAsync({
        nickname,
        make,
        model,
        year,
        imageFile,
        vehicleId: existingVehicle._id,
      });
    } else {
      // if no existingVehicle, add it
      await addVehicleStartAsync({
        nickname,
        make,
        model,
        year,
        imageFile,
      });
    }

    setInputState({
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
    });
    history.push('/my-page');
  };

  const handleDelete = async () => {
    await delectVehicleStartAsync(existingVehicle._id, userId);
    history.push('/my-page');
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const handleFileChange = e => {
    setInputState({
      ...inputState,
      imageFile: e.target.files[0],
    });
  };

  return (
    <form className='add-update-vehcle-form' onSubmit={handleSubmit}>
      <div className='vehicle-input-container'>
        <ImageInputBox
          type='file'
          name='imageData'
          onChange={handleFileChange}
          imageUrl={!!imageFile && URL.createObjectURL(imageFile)}
        />
        <div className='vehicle-info-input-container'>
          <InputBox
            type='text'
            name='nickname'
            label='Nickname'
            value={nickname}
            onChange={handleChange}
            locatedIn='inp-in-add-vehicle-page'
            required
          />
          <InputBox
            type='text'
            name='year'
            label='Year'
            value={year}
            onChange={handleChange}
            locatedIn='inp-in-add-vehicle-page'
            required
          />
          <InputBox
            type='text'
            name='make'
            label='Make'
            value={make}
            onChange={handleChange}
            locatedIn='inp-in-add-vehicle-page'
            required
          />
          <InputBox
            type='text'
            name='model'
            label='Model'
            value={model}
            onChange={handleChange}
            locatedIn='inp-in-add-vehicle-page'
            required
          />
        </div>
      </div>

      {existingVehicle ? (
        <div className='btn-group-in-add-vehicle'>
          <CustomButton type='submit' locatedIn='btn-in-add-vehicle-page'>
            UPDATE
          </CustomButton>
          <CustomButton
            type='button'
            locatedIn='btn-in-add-vehicle-page delete-btn'
            onClick={() => handleDelete()}
          >
            DELETE
          </CustomButton>
        </div>
      ) : (
        <CustomButton type='submit' locatedIn='btn-in-add-vehicle-page'>
          ADD
        </CustomButton>
      )}
    </form>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  vehicles: selectVehicles,
});

const mapDispatchToProps = dispatch => ({
  addVehicleStartAsync: newVehicleObj =>
    dispatch(addVehicleStartAsync(newVehicleObj)),
  updateVehicleStartAsync: vehicleInfoToUpdate =>
    dispatch(updateVehicleStartAsync(vehicleInfoToUpdate)),
  delectVehicleStartAsync: (vehicleId, userId) =>
    dispatch(delectVehicleStartAsync(vehicleId, userId)),
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AddUpdateVehicleForm);
