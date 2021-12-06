import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ImageDisplay from '../../image-display/image-display.component';
import IndividualVehicleInfo from '../../individual-vehicle-info/individual-vehicle-info.coponent';
import ServiceTableHeader from '../../service-table-header/service-table-header.component';
import ServiceItemGroup from '../../service-item-group/service-item-group.component';
import IconButton from '../../icon-button/icon-button.component';
import CustomButton from '../../custom-button/custom-button.component';

import { deleteServiceHistoryStartAsync } from '../../../redux/vehicle/vehicle.actions';

import { selectIsAuth, selectUserId } from '../../../redux/user/user.selectors';
import { selectVehicles } from '../../../redux/vehicle/vehicle.selectors';

import { getPreviousURL } from '../../../utils/url-utils';
import { getVehicleWithId } from '../../../utils/vehicle-utils';

import './vehicle-detail.styles.scss';

const VehicleDetailPage = ({
  history,
  match,
  isAuth,
  userId,
  vehicles,
  deleteServiceHistoryStartAsync,
}) => {
  const selectedVehicle = getVehicleWithId(vehicles, match.params.vehicleId);

  const handleDeleteServiceHistory = async (vehicleId, serviceId, userId) => {
    const requestURL = `/api/vehicle/${vehicleId}/${serviceId}`;
    await deleteServiceHistoryStartAsync(requestURL, userId);
  };

  const toEditService = serviceId => {
    history.push(`${match.url}/${serviceId}`);
  };

  if (!isAuth) {
    return <Redirect to='/' />;
  }
  return (
    <div className='vehicle-detail-page'>
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
        {selectedVehicle.serviceHistory.map(service => (
          <ServiceItemGroup
            key={service._id}
            {...service}
            toEditService={() => toEditService(service._id)}
            handleDeleteServiceHistory={() =>
              handleDeleteServiceHistory(
                selectedVehicle._id,
                service._id,
                userId
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  vehicles: selectVehicles,
  isAuth: selectIsAuth,
  userId: selectUserId,
});
const mapDispatchToProps = dispatch => ({
  deleteServiceHistoryStartAsync: (vehicleId, serviceId, userId) =>
    dispatch(deleteServiceHistoryStartAsync(vehicleId, serviceId, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailPage);
