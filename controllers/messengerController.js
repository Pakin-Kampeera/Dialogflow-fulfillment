const predictStress = require('./predictStressController');
const processMessage = require('./dialogflowController');
const {markSeenAction, typingAction} = require('./actionController');

const getWebhook = (req, res) => {
    let VERIFY_TOKEN = process.env.FACEBOOK_VERIFY_TOKEN;

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
};

const postWebhook = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                    markSeenAction(event.sender.id);
                    typingAction(event.sender.id);
                    if (event.message.text !== '!report') {
                        predictStress(event);
                    }
                    processMessage(event);
                }
            });
        });
        res.status(200).end();
    }
};

module.exports = {getWebhook, postWebhook};
