import React from 'react';

import InputBox from '../../input-box/input-box.component';
import ImageInputBox from '../../image-input-box/image-input-box.component';
import CustomButton from '../../custom-button/custom-button.component';

import './add-vehicle-page.styles.scss';

class AddVehiclePage extends React.Component {
  render() {
    return (
      <div className='add-vehicle-page'>
        <h2 className='add-vehicle-page-banner'>What is your vehicle?</h2>

        <form>
          <div className='vehicle-input-container'>
            <ImageInputBox type='file' name='vehicle-image' />
            <div className='vehicle-info-input-container'>
              <InputBox type='text' name='nickname' label='Nickname' required />
              <InputBox type='text' name='year' label='Year' required />
              <InputBox type='text' name='make' label='Make' required />
              <InputBox type='text' name='model' label='Model' required />
            </div>
          </div>
          <CustomButton className='btn' type='submit' locatedIn='add-vehicle-page'>
            ADD
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default AddVehiclePage;
