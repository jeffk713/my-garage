const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  nickname: {
    type: String,
  },
  make: {
    type: String,
  },
  model: {
    type: String,
  },
  year: {
    type: String,
  },
  history: [
    {
      serviceName: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  image: {
    type: File,
  },
});

module.exports = Vehicle = mongoose.model('vehicle', VehicleSchema);
