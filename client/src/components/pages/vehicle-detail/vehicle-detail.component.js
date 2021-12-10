import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ImageDisplay from '../../image-display/image-display.component';
import IndividualVehicleInfo from '../../individual-vehicle-info/individual-vehicle-info.coponent';
import ServiceTableHeader from '../../service-table-header/service-table-header.component';
import IconButton from '../../icon-button/icon-button.component';
import CustomButton from '../../custom-button/custom-button.component';
import ServiceItemGroupContainer from '../../service-item-group-container/service-item-group-container.component';
import WithSpinner from '../../spinner/with-spinner.component';
import ServiceDetailPopup from '../../service-detail-popup/service-detail-popup.component';

import {
  selectIsLoading,
  selectVehicles,
} from '../../../redux/vehicle/vehicle.selectors';

import { getPreviousURL } from '../../../utils/url-utils';
import { getVehicleWithId } from '../../../utils/vehicle-utils';

import './vehicle-detail.styles.scss';

const ServiceItemGroupContainerWithSpinner = WithSpinner(
  ServiceItemGroupContainer
);

const VehicleDetailPage = ({ history, match, isLoading, vehicles }) => {
  const INITIAL_SERVICE = {
    date: '',
    mileage: '',
    note: '',
    serviceName: '',
  };
  const [serviceToDisplay, setServiceToDisplay] = useState(INITIAL_SERVICE);

  const selectedVehicle = getVehicleWithId(vehicles, match.params.vehicleId);

  return (
    <div className='vehicle-detail-page'>
      {serviceToDisplay.serviceName && (
        <ServiceDetailPopup
          serviceToDisplay={serviceToDisplay}
          setServiceToDisplay={setServiceToDisplay}
        />
      )}
      <div className='button-group-in-vehicle-detail'>
        <IconButton
          option='icon-back-btn-in-my-page'
          onClick={() => history.push(getPreviousURL(match.url))}
        />
        <IconButton
          option='icon-add-vehicle-btn-in-my-page'
          onClick={() => history.push(`${match.params.vehicleId}/add-service`)}
        />
      </div>
      <div className='vehicle-basic-info'>
        <ImageDisplay
          vehicleId={selectedVehicle._id}
          vehicleImage={selectedVehicle.vehicleImage}
        />
        <div className='vehicle-info-edit-section'>
          <div className='vehicle-info-container'>
            <IndividualVehicleInfo
              vehicleInfo='Nickname'
              value={selectedVehicle.nickname}
            />
            <IndividualVehicleInfo
              vehicleInfo='Year'
              value={selectedVehicle.year}
            />
            <IndividualVehicleInfo
              vehicleInfo='Make'
              value={selectedVehicle.make}
            />
            <IndividualVehicleInfo
              vehicleInfo='Model'
              value={selectedVehicle.model}
            />
          </div>
          <CustomButton
            locatedIn='btn-in-vehicle-detail'
            onClick={() => history.push(`${match.url}/edit`)}
          >
            Edit Vehicle
          </CustomButton>
        </div>
      </div>
      <div className='vehicle-service-table'>
        <ServiceTableHeader />
        <ServiceItemGroupContainerWithSpinner
          spinnerOption='spinner-in-vehicle-detail-page'
          history={history}
          match={match}
          isLoading={isLoading}
          selectedVehicle={selectedVehicle}
          setServiceToDisplay={setServiceToDisplay}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
  isLoading: selectIsLoading,
});

export default connect(mapStateToProps)(VehicleDetailPage);
