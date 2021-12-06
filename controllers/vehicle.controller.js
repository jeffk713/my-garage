const Vehicle = require('../models/vehicle.model');

const sharp = require('sharp');

exports.registerVehicle = async (req, res) => {
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
    res
      .status(500)
      .send({ errorMessage: 'Server error upon vehicle registration' });
  }
};

exports.uploadVehicleImage = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.vehicleId,
    });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'Vehicle not found' });
    }

    const sharpBuffer = await sharp(req.file.buffer).png().toBuffer();

    vehicle.vehicleImage = sharpBuffer;
    await vehicle.save();
    res.send('upload complete!');
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ errorMessage: 'Server error upon vehicle image upload' });
  }
};

exports.updateVehicle = async (req, res) => {
  const { nickname, make, model, year } = req.body;

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'Vehicle not found' });
    }

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
    res.status(500).send({ errorMessage: 'Server error upon update vehicle' });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const removedVehicle = await Vehicle.findOneAndRemove({
      _id: req.params.vehicleId,
    });
    if (!removedVehicle) {
      return res.status(400).json({ errorMessage: 'Vehicle not found' });
    }

    res.json(removedVehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ errorMessage: 'Server error upon update vehicle' });
  }
};

exports.getUserVehicles = async (req, res) => {
  const userId = req.params.userId;

  try {
    const vehicles = await Vehicle.find({ user: userId });
    if (!vehicles) {
      return res.status(400).json({ errorMessage: 'Vehicles not found' });
    }

    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      errorMessage: 'Server error upon loading all registered vehicles',
    });
  }
};

exports.getVehicleImage = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'Vehicles not found' });
    }

    res.set('Content-Type', 'image/png');
    res.send(vehicle.vehicleImage);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      errorMessage: 'Server error upon fetching a vehicle image',
    });
  }
};

exports.addVehicleService = async (req, res) => {
  const { serviceName, mileage, date, note } = req.body;
  const newServiceHistory = { serviceName, mileage, date, note };

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'Vehicle not found' });
    }

    vehicle.serviceHistory.unshift(newServiceHistory);
    vehicle.serviceHistory.sort((a, b) => b.date - a.date);

    await vehicle.save();
    res.json(vehicle.serviceHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      errorMessage: 'Server error upon vehicle service history update',
    });
  }
};

exports.updateVehicleService = async (req, res) => {
  const { serviceName, mileage, date, note } = req.body;
  const newServiceHistory = { serviceName, mileage, date, note };

  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'No vehicle found' });
    }

    const serviceHistory = vehicle.serviceHistory;
    const indexToEdit = serviceHistory.findIndex(
      service => service._id.toString() === req.params.serviceId
    );

    serviceHistory[indexToEdit] = newServiceHistory;
    serviceHistory.sort((a, b) => b.date - a.date);

    await vehicle.save();

    res.json(vehicle.serviceHistory);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ errorMessage: 'Server error upon vehicle service update' });
  }
};

exports.deleteVehicleService = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ _id: req.params.vehicleId });
    if (!vehicle) {
      return res.status(400).json({ errorMessage: 'No vehicle found' });
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
    res
      .status(500)
      .send({ errorMessage: 'Server error upon vehicle service update' });
  }
};
