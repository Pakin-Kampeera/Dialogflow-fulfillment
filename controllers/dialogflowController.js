const dialogflow = require('dialogflow');
const {sendMessage, sendImage} = require('./actionController');
const generateChart = require('../util/report');

const projectID = process.env.PROJECT_ID;
const sessionID = process.env.SESSION_ID;

const config = {
    credentials: {
        private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        client_email: process.env.DIALOGFLOW_CLIENT_EMAIL
    }
};

const sessionClient = new dialogflow.SessionsClient(config);
const sessionPath = sessionClient.sessionPath(projectID, sessionID);

const sendTextMessage = async (userID, text) => {
    if (text.intent.displayName === 'jokes.meme') {
        const payloadFields =
            text.fulfillmentMessages[
                (text.fulfillmentMessages.length * Math.random()) | 0
            ].payload.fields;
        sendMessage(userID, payloadFields.text.stringValue);
        sendImage(userID, payloadFields.url.stringValue);
    } else {
        try {
            sendMessage(userID, text.fulfillmentText);
        } catch (error) {
            console.log(error);
        }
    }
};

const sendTextToDialogflow = async (event) => {
    const userID = event.sender.id;
    const message = event.message.text;
    if (event.message.text === '!report') {
        const chartInfo = await generateChart(userID);
        if (chartInfo) {
            sendMessage(userID, 'Give me a second 👨‍💻');
            sendImage(userID, chartInfo);
        } else {
            sendMessage(userID, 'Maybe you can talk with me a little bit 😙');
        }
        return;
    }
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en-US'
            }
        }
    };
    sessionClient
        .detectIntent(request)
        .then((response) => {
            const result = response[0].queryResult;
            return sendTextMessage(userID, result);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = sendTextToDialogflow;
