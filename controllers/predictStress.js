const fetch = require('node-fetch');
const storeData = require('./dataController');
const History = require('../models/history');
const Data = require('../models/data');
const FBMessenger = require('fb-messenger');

const predictStress = async (event) => {
    let result;
    try {
        const data = await fetch(`http://127.0.0.1:5000/predict`, {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(`[${event.message.text}]`)
        });
        result = await data.json();
        // storeData(event, result);
    } catch (error) {
        console.log(error);
    }

    try {
        const oldUser = await History.findOne({userId: event.sender.id});
        if (oldUser) {
            console.log('Old user');
            await Data.findOneAndUpdate({}, {$inc: {comments: 1}});
        } else {
            console.log('New user');
            const hasDocument = await Data.findOneAndUpdate(
                {},
                {$inc: {users: 1, comments: 1}}
            );
            console.log(hasDocument);
            if (!hasDocument) {
                const data = await Data.create({
                    users: 1,
                    comments: 1,
                    stress: 1,
                    nonStress: 1
                });
                await data.save();
            }
        }
    } catch (error) {
        console.log(error);
    }

    try {
        const messenger = new FBMessenger({
            token: process.env.FACEBOOK_ACCESS_TOKEN
        });
        const user = await messenger.getProfile({id: event.sender.id});
        const history = await History.create({
            userId: event.sender.id,
            username: `${user.first_name} ${user.last_name}`,
            message: event.message.text,
            labels: result[0].labels,
            confidence: result[0].confidence_score
        });

        await history.save();
    } catch (error) {
        console.log(error);
    }
};

module.exports = predictStress;
