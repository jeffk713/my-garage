import React from 'react';
import { connect } from 'react-redux';

import axios from 'axios';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import {
  addVehicleSuccess,
  addVehicleFailure,
} from '../../../redux/vehicle/vehicle.actions';

import './add-vehicle-page.styles.scss';

class AddVehiclePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
      imageUrl: '',
    };
  }

  uploadVehicleImage = async (imgFile, requestURL) => {
    const formData = new FormData();
    formData.append('vehicleImage', imgFile, imgFile.name);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await axios.post(requestURL, formData, config);
    } catch (err) {
      alert('Uploading vehicle picrure has failed');
      console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { nickname, make, model, year, imageFile } = this.state;
    const { addVehicleSuccess, addVehicleFailure, history } = this.props;
    const { uploadVehicleImage } = this;

    const newVehicle = { nickname, make, model, year };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const body = JSON.stringify(newVehicle);

      const res = await axios.post('/api/vehicle/register', body, config);
      const vehicleObj = res.data;
      addVehicleSuccess(vehicleObj);

      if (imageFile) {
        const reqUrl = `/api/vehicle/${vehicleObj._id}`;
        uploadVehicleImage(imageFile, reqUrl);
      }

      this.setState({
        nickname: '',
        year: '',
        make: '',
        model: '',
        imageFile: null,
        imageUrl: '',
      });

      history.push('/my-page');
    } catch (err) {
      alert('Vehicle registration has failed');
      console.error('ERROR UPON VEHICLE REGISTRATION:', err.message);
      addVehicleFailure();
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFileChange = async e => {
    this.setState({
      ...this.state,
      imageFile: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0]),
    });

    console.log('img:', e.target.files[0]);
  };

  render() {
    const { handleSubmit, handleChange, handleFileChange } = this;
    const { nickname, year, make, model, imageUrl } = this.state;
    return (
      <div className='add-vehicle-page'>
        <Banner>What is your vehicle?</Banner>
        <form onSubmit={handleSubmit}>
          <div className='vehicle-input-container'>
            <ImageInputBox
              type='file'
              name='imageData'
              onChange={handleFileChange}
              imageUrl={imageUrl}
            />
            <div className='vehicle-info-input-container'>
              <InputBox
                type='text'
                name='nickname'
                label='Nickname'
                value={nickname}
                onChange={handleChange}
                required
              />
              <InputBox
                type='text'
                name='year'
                label='Year'
                value={year}
                onChange={handleChange}
                required
              />
              <InputBox
                type='text'
                name='make'
                label='Make'
                value={make}
                onChange={handleChange}
                required
              />
              <InputBox
                type='text'
                name='model'
                label='Model'
                value={model}
                onChange={handleChange}
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
  }
}

const mapDispatchToProps = dispatch => ({
  addVehicleSuccess: vehicleObj => dispatch(addVehicleSuccess(vehicleObj)),
  addVehicleFailure: () => dispatch(addVehicleFailure()),
});

export default connect(null, mapDispatchToProps)(AddVehiclePage);
