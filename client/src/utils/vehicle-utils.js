export const getVehicleWithId = (vehicleArr, vehicleId) => {
  for (const vehicle of vehicleArr) {
    if (vehicle._id.toString() === vehicleId) {
      return vehicle;
    }
  }
  return null;
};

export const getVehicleServiceWithId = (serviceArr, serviceId) => {
  for (const service of serviceArr) {
    if (serviceId === service._id) {
      return service;
    }
  }
  return null;
};

export const getVeihcleArrWithBooleanImageData = vehicleArr => {
  return vehicleArr.map(vehicle => {
    if (vehicle.vehicleImage) {
      vehicle.vehicleImage = true;
    }
    return vehicle;
  });
};
