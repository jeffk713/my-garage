const express = require('express');
const router = express.Router();

const Vehicle = require('../models/vehicle.model');

const checkCookie = require('../middleware/check-cookie');
const uploadImage = require('../middleware/uploadImage');
const sharp = require('sharp');

// @private-route  POST /api/vehicle/register
// check auth cookie and register vehicle
router.post('/register', checkCookie, async (req, res) => {
  const { nickname, make, model, year } = req.body;
  try {
    const vehicle = new Vehicle({
      nickname,
      make,
      model,
      year,
    });
    vehicle.user = req.userId;

    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon vehicle registration');
  }
});

// @private-route  POST /api/vehicle/:vehicleId
// check auth cookie and upload vehicle image
router.post(
  '/:vehicleId',
  checkCookie,
  uploadImage.single('vehicleImage'),
  async (req, res) => {
    try {
      const vehicle = await Vehicle.findOne({
        _id: req.params.vehicleId,
      }).select('-vehicleImage');
      if (!vehicle) {
        return res.status(400).json({ error: { msg: 'Vehicle not found' } });
      }

      const sharpBuffer = await sharp(req.file.buffer)
        .resize({ width: 200, height: 200 })
        .png()
        .toBuffer();

      vehicle.vehicleImage = sharpBuffer;
      await vehicle.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error upon vehicle image upload');
    }
  }
);

// @private-route  PUT /api/vehicle/:vehicleId
// check auth cookie and update a registered vehicle
router.put('/:vehicleId', checkCookie, async (req, res) => {
  const { nickname, make, model, year } = req.body;

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    const serviceHistory = vehicle.serviceHistory;
    vehicle.nickname = nickname;
    vehicle.make = make;
    vehicle.model = model;
    vehicle.year = year;
    vehicle.serviceHistory = serviceHistory;

    await vehicle.save();

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon update vehicle');
  }
});

// @private-route  DELETE /api/vehicle/:vehicleId
// check auth cookie and delete a registered vehicle
router.delete('/:vehicleId', checkCookie, async (req, res) => {
  try {
    const removedVehicle = await Vehicle.findOneAndRemove({
      _id: req.params.vehicleId,
    });

    res.json(removedVehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon update vehicle');
  }
});

// @private-route  GET /api/vehicle/all-vehicles
// check auth cookie and get all registered vehicles to user
router.get('/user-vehicles/:userId', checkCookie, async (req, res) => {
  const userId = req.params.userId;

  try {
    const vehicles = await Vehicle.find({ user: userId });

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon loading all registered vehicles');
  }
});

// @private-route  PUT /api/vehicle/:vehicleId/add-service
// check auth cookie and update vehicle service
router.put('/:vehicleId/add-service', checkCookie, async (req, res) => {
  const { serviceName, mileage, date, note } = req.body;
  const newServiceHistory = { serviceName, mileage, date, note };

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });

    vehicle.serviceHistory.unshift(newServiceHistory);
    vehicle.serviceHistory.sort((a, b) => b.date - a.date);

    await vehicle.save();
    res.json(vehicle.serviceHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon vehicle service history update');
  }
});

// @private-route  PUT /api/vehicle/:vehicleId/:serviceId
// check auth cookie and update vehicle service
router.put('/:vehicleId/:serviceId', checkCookie, async (req, res) => {
  const { serviceName, mileage, date, note } = req.body;
  const newServiceHistory = { serviceName, mileage, date, note };

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ error: { msg: 'No vehicle found' } });
    }

    const serviceHistory = vehicle.serviceHistory;
    const indexToEdit = serviceHistory.findIndex(
      service => service._id.toString() === req.params.serviceId
    );

    serviceHistory[indexToEdit] = newServiceHistory;
    serviceHistory.sort((a, b) => b.date - a.date);

    await vehicle.save();

    // res.json(vehicle.serviceHistory.sort((a, b) => b.date - a.date));
    res.json(vehicle.serviceHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon vehicle service update');
  }
});

// @private-route  DELETE /api/vehicle/:vehicleId/:serviceId
// check auth cookie and update vehicle service
router.delete('/:vehicleId/:serviceId', checkCookie, async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ error: { msg: 'No vehicle found' } });
    }

    const serviceHistory = vehicle.serviceHistory;
    const indexToRemove = serviceHistory.findIndex(
      service => service._id.toString() === req.params.serviceId
    );

    serviceHistory.splice(indexToRemove, 1);

    await vehicle.save();

    res.json(vehicle.serviceHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error upon vehicle service update');
  }
});

module.exports = router;
