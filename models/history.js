const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  labels: {
    type: String,
    required: true,
  },
  confidence: {
    type: String,
    required: true,
  },
  time: { type: Date, default: Date.now },
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
