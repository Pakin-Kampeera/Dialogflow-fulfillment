const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    users: {
      type: Number,
    },
    comments: {
      type: Number,
    },
    stress: {
      type: Number,
    },
    non_stress: {
      type: Number,
    },
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
