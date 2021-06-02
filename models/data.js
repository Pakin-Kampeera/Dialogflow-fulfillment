const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    sentences: [
      {
        text: { type: String, required: true },
        label: { type: String, required: true },
        confidence: { type: String, required: true },
      },
    ],
  },
  { timestamps: { currentTime: () => Math.floor(Date.now() / 1000) } }
);

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
