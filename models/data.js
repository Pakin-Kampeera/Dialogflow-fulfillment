const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  users: {
    type: Number,
  },
  comments: {
    type: Number,
  },
  stress: {
    type: Number,
  },
  nonStress: {
    type: Number,
  },
  time: { type: Date, default: Date.now },
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
