import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import { selectUserId } from '../../../redux/user/user.selectors';
import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import {
  addVehicleStartAsync,
  uploadVehicleImage,
  updateVehicleStartAsync,
  delectVehicleStartAsync,
} from '../../../redux/vehicle/vehicle.actions';
import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';

import { getVehicleWithId } from '../../../utils/vehicle-utils';

import './add-vehicle-page.styles.scss';

const AddVehiclePage = ({
  addVehicleStartAsync,
  uploadVehicleImage,
  getUserVehiclesStartAsync,
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

    let vehicleObj;
    if (existingVehicle) {
      // if existingVehicle, edit it
      vehicleObj = await updateVehicleStartAsync({
        nickname,
        make,
        model,
        year,
        vehicleId: existingVehicle._id,
      });
    } else {
      // if no existingVehicle, add it
      vehicleObj = await addVehicleStartAsync({ nickname, make, model, year });
    }

    // when imageFile present
    if (imageFile) {
      await uploadVehicleImage(imageFile, `/api/vehicle/${vehicleObj._id}`);
    }

    setInputState({
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
    });

    // get updated user vehicles after adding vehicle
    await getUserVehiclesStartAsync(userId);

    // go to mypage
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

  const handleDelete = async () => {
    await delectVehicleStartAsync(existingVehicle._id);
    await getUserVehiclesStartAsync(userId);

    history.push('/my-page');
  };

  return (
    <div className='add-vehicle-page'>
      <Banner>What Is Your Vehicle?</Banner>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
  vehicles: selectVehicles,
});

const mapDispatchToProps = dispatch => ({
  addVehicleStartAsync: newVehicleObj =>
    dispatch(addVehicleStartAsync(newVehicleObj)),
  uploadVehicleImage: (imageFile, url) =>
    dispatch(uploadVehicleImage(imageFile, url)),
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
  updateVehicleStartAsync: ({ nickname, make, model, year, vehicleId }) =>
    dispatch(
      updateVehicleStartAsync({ nickname, make, model, year, vehicleId })
    ),
  delectVehicleStartAsync: vehicleId =>
    dispatch(delectVehicleStartAsync(vehicleId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddVehiclePage);
