import React from 'react';

import './add-vehicle-page.styles.scss';

class AddVehiclePage extends React.Component {
  render() {
    return (
      <div className='add-vehicle-page'>
        <h2 className='add-vehicle-page-banner'>What is your vehicle?</h2>

        <form>
          <div className='vehicle-input-container'>
            <div className='vehicle-image-input-box'>
              <div className='vehicle-image'>vehicle image</div>
              <input type='file' name='vehicle-image' />
            </div>
            <div className='vehicle-info-input-container'>
              <div className='input-box'>
                <label for='nickname'>Nickname</label>
                <input type='text' name='nickname' required />
              </div>
              <div className='input-box'>
                <label for='year'>Year</label>
                <input type='text' name='year' required />
              </div>
              <div className='input-box'>
                <label for='make'>Make</label>
                <input type='text' name='make' required />
              </div>
              <div className='input-box'>
                <label for='model'>Model</label>
                <input type='text' name='model' required />
              </div>
            </div>
          </div>
          <button className='btn' type='submit'>
            ADD
          </button>
        </form>
      </div>
    );
  }
}

export default AddVehiclePage;
