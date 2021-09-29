const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
    {
        users: Number,
        messages: Number,
        stress: Number,
        nonStress: Number,
        cantTell: Number
    },
    {timestamps: true}
);

const data = mongoose.model('Data', dataSchema);

module.exports = data;
