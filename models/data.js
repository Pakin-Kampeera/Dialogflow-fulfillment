const mongoose = require('mongoose');
const moment = require('moment');

const DataSchema = new mongoose.Schema({
    users: {
        type: Number
    },
    comments: {
        type: Number
    },
    stress: {
        type: Number
    },
    nonStress: {
        type: Number
    },
    time: {
        type: String,
        default: moment().format('L')
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;
