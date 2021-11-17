import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import { selectUserId } from '../../../redux/user/user.selectors';

import {
  addVehicleStartAsync,
  uploadVehicleImage,
} from '../../../redux/vehicle/vehicle.actions';
import { getUserVehiclesStartAsync } from '../../../redux/vehicle/vehicle.actions';

import './add-vehicle-page.styles.scss';

const INITIAL_INPUT = {
  nickname: '',
  year: '',
  make: '',
  model: '',
  imageFile: null,
};

const AddVehiclePage = ({
  addVehicleStartAsync,
  uploadVehicleImage,
  getUserVehiclesStartAsync,
  history,
  userId,
}) => {
  const [inputState, setInputState] = useState(INITIAL_INPUT);
  const { nickname, make, model, year, imageFile } = inputState;

  const handleSubmit = async e => {
    e.preventDefault();

    const newVehicle = { nickname, make, model, year };
    const vehicleObj = await addVehicleStartAsync(newVehicle);
    if (!vehicleObj) {
      return console.error('ERROR UPON VEHICLE REGISTRATIOIN');
    }

    if (imageFile) {
      console.log(`/api/vehicle/${vehicleObj._id}`);
      const uploadImageSuccess = await uploadVehicleImage(
        imageFile,
        `/api/vehicle/${vehicleObj._id}`
      );

      if (!uploadImageSuccess) {
        console.log('ERROR UPON VEHICLE IMAGE UPLOAD');
      }
    }

    setInputState({ ...INITIAL_INPUT });

    const vehicles = await getUserVehiclesStartAsync(userId);
    if (!vehicles) {
      return console.error('ERROR UPON VEHICLE LOADING');
    }

    history.push('/my-page');
  };

  const handleChange = e => {
    const { value, name } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const handleFileChange = async e => {
    setInputState({
      ...inputState,
      imageFile: e.target.files[0],
    });
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
        <CustomButton type='submit' locatedIn='btn-in-add-vehicle-page'>
          ADD
        </CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
});

const mapDispatchToProps = dispatch => ({
  addVehicleStartAsync: newVehicleObj =>
    dispatch(addVehicleStartAsync(newVehicleObj)),
  uploadVehicleImage: (imageFile, url) =>
    dispatch(uploadVehicleImage(imageFile, url)),
  getUserVehiclesStartAsync: userId =>
    dispatch(getUserVehiclesStartAsync(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddVehiclePage);
