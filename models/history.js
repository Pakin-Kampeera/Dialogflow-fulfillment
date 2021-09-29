const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
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
        }
    },
    {timestamps: true}
);

const history = mongoose.model('History', historySchema);

module.exports = history;
