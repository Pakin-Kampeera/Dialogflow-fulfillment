const Notification = require('../models/notification');
const cron = require('node-cron');
const {typingAction, sendMessage, sendImage} = require('./actionController');
const items = require('../mock/greeting');

// Run every 2 PM
const startJob = () => {
    cron.schedule('00 00 14 * * *', () => {
        console.log('Notify user!');
        notifyUser();
    });
};

// Send message to user if inactive 2 days or more.
const notifyUser = async () => {
    const user = await Notification.find({});

    if (user) {
        user.forEach((elem) => {
            const currentTime = new Date();
            const inactiveTime = new Date(elem.updatedAt);
            const inactiveRange =
                currentTime.getDate() - inactiveTime.getDate();
            if (inactiveRange > 2) {
                const item = items[Math.floor(Math.random() * items.length)];
                typingAction(elem.userId);
                sendMessage(elem.userId, item.message);
                sendImage(elem.userId, item.url);
            }
        });
    }
};

module.exports = {startJob};
