const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema(
    {
        userId: String
    },
    {timestamps: true}
);

const notification = mongoose.model('Notification', notificationSchema);

module.exports = notification;
