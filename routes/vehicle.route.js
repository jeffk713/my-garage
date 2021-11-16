const express = require('express');
const router = express.Router();

const checkCookie = require('../middleware/check-cookie');
const uploadImage = require('../middleware/uploadImage');

const vehicleController = require('../controllers/vehicle.controller');

//============= VEHICLE ==================//

// @private-route  POST /api/vehicle/register
// check auth cookie and register vehicle
router.post('/register', checkCookie, vehicleController.registerVehicle);

// @private-route  POST /api/vehicle/:vehicleId
// check auth cookie and upload vehicle image
router.post(
  '/:vehicleId',
  checkCookie,
  uploadImage.single('vehicleImage'),
  vehicleController.uploadVehicleImage
);

// @private-route  PUT /api/vehicle/:vehicleId
// check auth cookie and update a registered vehicle
router.put('/:vehicleId', checkCookie, vehicleController.updateVehicle);

// @private-route  DELETE /api/vehicle/:vehicleId
// check auth cookie and delete a registered vehicle
router.delete('/:vehicleId', checkCookie, vehicleController.deleteVehicle);

// @private-route  GET /api/vehicle
// check auth cookie and get all registered vehicles to user
router.get(
  '/user-vehicles/:userId',
  checkCookie,
  vehicleController.getUserVehicles
);

//============ VEHICLE SERVICE ================//

// @private-route  PUT /api/vehicle/:vehicleId/add-service
// check auth cookie and add vehicle service
router.put(
  '/:vehicleId/add-service',
  checkCookie,
  vehicleController.addVehicleService
);

// @private-route  PUT /api/vehicle/:vehicleId/:serviceId
// check auth cookie and update vehicle service
router.put(
  '/:vehicleId/:serviceId',
  checkCookie,
  vehicleController.updateVehicleService
);

// @private-route  DELETE /api/vehicle/:vehicleId/:serviceId
// check auth cookie and delete vehicle service
router.delete(
  '/:vehicleId/:serviceId',
  checkCookie,
  vehicleController.deleteVehicleService
);

module.exports = router;
