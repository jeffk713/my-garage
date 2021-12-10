import React from 'react';

import AddUpdateVehicleForm from '../../add-update-vehicle-form/add-update-vehicle-form.component';
import Banner from '../../banner/banner.component';

import './add-update-vehice.styles.scss';

const AddUpdateVehiclePage = () => {
  return (
    <div className='add-vehicle-page'>
      <Banner>Please Enter Vehicle Information</Banner>
      <AddUpdateVehicleForm />
    </div>
  );
};

export default AddUpdateVehiclePage;
