import React from 'react';
import { connect } from 'react-redux';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import {
  addVehicleStartAsync,
  uploadVehicleImage,
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
    const { nickname, make, model, year, imageFile } = this.state;
    const { addVehicleStartAsync, uploadVehicleImage, history } = this.props;

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

    this.setState({
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
    });
    history.push('/my-page');
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFileChange = async e => {
    this.setState({
      ...this.state,
      imageFile: e.target.files[0],
    });
  };

  render() {
    const { handleSubmit, handleChange, handleFileChange } = this;
    const { nickname, year, make, model, imageFile } = this.state;
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
  }
}

const mapDispatchToProps = dispatch => ({
  addVehicleStartAsync: newVehicleObj =>
    dispatch(addVehicleStartAsync(newVehicleObj)),
  uploadVehicleImage: (imageFile, url) =>
    dispatch(uploadVehicleImage(imageFile, url)),
});

export default connect(null, mapDispatchToProps)(AddVehiclePage);
