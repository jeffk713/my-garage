import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ServiceItemGroup from '../service-item-group/service-item-group.component';

import { deleteServiceHistoryStartAsync } from '../../redux/vehicle/vehicle.actions';
import { selectUserId } from '../../redux/user/user.selectors';

const ServiceItemGroupContainer = ({
  selectedVehicle,
  history,
  match,
  userId,
  deleteServiceHistoryStartAsync,
}) => {
  const handleDeleteServiceHistory = async (vehicleId, serviceId, userId) => {
    const requestURL = `/api/vehicle/${vehicleId}/${serviceId}`;
    await deleteServiceHistoryStartAsync(requestURL, userId);
  };

  const toEditService = serviceId => {
    history.push(`${match.url}/${serviceId}`);
  };
  return (
    <>
      {selectedVehicle.serviceHistory.map(service => (
        <ServiceItemGroup
          key={service._id}
          {...service}
          toEditService={() => toEditService(service._id)}
          handleDeleteServiceHistory={() =>
            handleDeleteServiceHistory(selectedVehicle._id, service._id, userId)
          }
        />
      ))}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  userId: selectUserId,
});
const mapDispatchToProps = dispatch => ({
  deleteServiceHistoryStartAsync: (vehicleId, serviceId, userId) =>
    dispatch(deleteServiceHistoryStartAsync(vehicleId, serviceId, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceItemGroupContainer);
