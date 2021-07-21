const mongoose = require('mongoose');
const moment = require('moment');

const HistorySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    labels: {
        type: String,
        required: true
    },
    confidence: {
        type: String,
        required: true
    },
    time: {
        type: String,
        default: moment().format('L')
    }
});

const History = mongoose.model('History', HistorySchema);

module.exports = History;
