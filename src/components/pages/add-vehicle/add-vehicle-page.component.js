import React from 'react';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';
import Banner from '../../banner/banner.component';

import './add-vehicle-page.styles.scss';

class AddVehiclePage extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    console.log(this.state);

    this.setState({
      nickname: '',
      year: '',
      make: '',
      model: '',
      imageFile: null,
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleFileChange = e => {
    this.setState({
      ...this.state,
      imageFile: URL.createObjectURL(e.target.files[0]),
    });
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

export default AddVehiclePage;
