const express = require('express');
const router = express.Router();

const Vehicle = require('../models/vehicle.model');

const checkCookie = require('../middleware/check-cookie');
const uploadImage = require('../middleware/uploadImage');
const sharp = require('sharp');

// @private-route  POST /api/vehicle/register
// check auth cookie and register vehicle
router.post('/register', checkCookie, async (req, res) => {
  const { nickname, make, model, year, service } = req.body;
  try {
    const vehicle = new Vehicle({
      nickname,
      make,
      model,
      year,
      service,
    });
    vehicle.user = req.userId;

    await vehicle.save();

    res.send(vehicle);
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

// // @private-route  GET /api/vehicle/
// // check auth cookie and get all registered vehicles
// router.get('/', checkCookie, async (req, res) => {
//   try {
//     // look for vehicle with user ID from cookie
//     const vehicles = await vehicle.find({ user: req.userId });

//     console.log(vehicles);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error upon vehicle registration');
//   }
// });

// // @private-route  GET /api/vehicle/:vehicle_id
// // check auth cookie and get one registered vehicles
// router.get('/:vehicle_id', checkCookie, async (req, res) => {
//   try {
//     // look for vehicle with user ID from cookie
//     const vehicle = await vehicle.find({ _id: req.params.vehicle_id });

//     if (!vehicle) {
//       return res
//         .status(400)
//         .json({ error: { msg: 'The vehicle does not exist' } });
//     }
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res
//         .status(400)
//         .json({ error: { msg: 'The vehicle does not exist' } });
//     }
//     res.status(500).send('Server error upon vehicle registeration');
//   }
// });

module.exports = router;
