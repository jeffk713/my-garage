import React from 'react';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';

import './add-vehicle-page.styles.scss';

class AddVehiclePage extends React.Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      year: '',
      make: '',
      model: '',
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
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { handleSubmit, handleChange } = this;
    const { nickname, year, make, model } = this.state;
    return (
      <div className='add-vehicle-page'>
        <h2 className='add-vehicle-page-banner'>What is your vehicle?</h2>

        <form onSubmit={handleSubmit}>
          <div className='vehicle-input-container'>
            <ImageInputBox type='file' name='vehicle-image' />
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
          <CustomButton type='submit' locatedin='in-add-vehicle-page'>
            ADD
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default AddVehiclePage;
