const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
    {
        userId: {
            type: String
        },
        stress: {
            type: Number
        },
        nonStress: {
            type: Number
        },
        cantTell: {
            type: Number
        }
    },
    {timestamps: true}
);

const report = mongoose.model('Report', reportSchema);

module.exports = report;
