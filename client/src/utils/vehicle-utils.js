export const getVehicleWithId = (vehicleArr, vehicleId) => {
  for (const vehicle of vehicleArr) {
    if (vehicle._id.toString() === vehicleId) {
      return vehicle;
    }
  }
  return null;
};
