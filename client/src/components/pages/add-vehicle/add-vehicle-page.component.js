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
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { nickname, make, model, year } = this.state;
    const { addVehicleSuccess, addVehicleFailure, history } = this.props;

    console.log(this.state);
    const newVehicle = { nickname, make, model, year };
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const body = JSON.stringify(newVehicle);

      const res = await axios.post('/api/vehicle/register', body, config);
      const vehicleObj = res.data;
      console.log('vehicle:', vehicleObj);

      addVehicleSuccess(vehicleObj);
      history.push('/my-page');
    } catch (err) {
      alert('Vehicle registration has failed');
      console.error('ERROR UPON VEHICLE REGISTRATION:', err);
      addVehicleFailure();
    }

    this.setState({
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
      imageBuffer: null,
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFileChange = async e => {
    const imgUrl = URL.createObjectURL(e.target.files[0]);

    this.setState({
      ...this.state,
      imageFile: imgUrl,
    });
    console.log('imgURL:', imgUrl);
    let blob = await fetch(imgUrl).then(r => r.blob());
    console.log('blob:', blob);
  };

  render() {
    const { handleSubmit, handleChange, handleFileChange } = this;
    const { nickname, year, make, model, imageFile } = this.state;
    return (
      <div className='add-vehicle-page'>
        <Banner>What is your vehicle?</Banner>
        <form onSubmit={handleSubmit}>
          <div className='vehicle-input-container'>
            <ImageInputBox
              type='file'
              name='imageData'
              onChange={handleFileChange}
              imageFile={imageFile}
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
