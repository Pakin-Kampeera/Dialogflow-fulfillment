const mongoose = require('mongoose');

const averageSchema = new mongoose.Schema(
    {
        stress: {
            type: Number,
            default: 0
        },
        nonStress: {
            type: Number,
            default: 0
        },
        cantTell: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
);

const average = mongoose.model('Average', averageSchema);

module.exports = average;
