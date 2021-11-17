import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ImageDisplay from '../../image-display/image-display.component';
import IndividualVehicleInfo from '../../individual-vehicle-info/individual-vehicle-info.coponent';
import ServiceTableHeader from '../../service-table-header/servie-table-header.component';
import ServiceItemGroup from '../../service-item-group/service-item-group.component';
import IconButton from '../../icon-button/icon-button.component';

import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import { getPreviousURL } from '../../../utils/url-utils';
import { getVehicleWithId } from '../../../utils/vehicle-utils';

import './vehicle-detail.styles.scss';

const VehicleDetailPage = ({ history, match, vehicles }) => {
  const vehicleToShow = getVehicleWithId(vehicles, match.params.vehicleId);
  return (
    <div className='vehicle-detail-page'>
      <div className='button-group-in-vehicle-detail'>
        <IconButton
          option='back-btn-in-my-page'
          onClick={() => history.push(getPreviousURL(match.url))}
        />
        <IconButton
          option='add-vehicle-btn-in-my-page'
          onClick={() => history.push(`${match.params.vehicleId}/add-service`)}
        />
      </div>
      <div className='vehicle-basic-info'>
        <ImageDisplay imageUrl={vehicleToShow.imageUrl} />
        <div className='vehicle-info-container'>
          <IndividualVehicleInfo
            vehicleInfo='Nickname'
            value={vehicleToShow.nickname}
          />
          <IndividualVehicleInfo
            vehicleInfo='Make'
            value={vehicleToShow.make}
          />
          <IndividualVehicleInfo
            vehicleInfo='Model'
            value={vehicleToShow.model}
          />
          <IndividualVehicleInfo
            vehicleInfo='Year'
            value={vehicleToShow.year}
          />
        </div>
      </div>
      <div className='vehicle-service-table'>
        <ServiceTableHeader />
        <ServiceItemGroup />
        <ServiceItemGroup />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
});
export default connect(mapStateToProps)(VehicleDetailPage);
