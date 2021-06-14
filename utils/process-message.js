const FBMessenger = require('fb-messenger');

const projectID = 'fbmessengerbot-ulur';
const sessionID = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
  credentials: { private_key: process.env.DIALOGFLOW_PRIVATE_KEY, client_email: process.env.DIALOGFLOW_CLIENT_EMAIL },
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectID, sessionID);

const FB_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

const sendTextMessage = (userID, text) => {
  const messenger = new FBMessenger({ token: FB_ACCESS_TOKEN });
  if (text.intent.displayName === 'Meme') {
    const payloadFields = text.fulfillmentMessages[0].payload.fields;
    messenger.sendTextMessage({ id: userID, text: payloadFields.text.stringValue });
    messenger.sendImageMessage({
      id: userID,
      url: payloadFields.url.stringValue,
    });
  } else {
    messenger.sendTextMessage({ id: userID, text: text.fulfillmentText });
  }
};

module.exports = (event) => {
  const userID = event.sender.id;
  const message = event.message.text;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then((response) => {
      const result = response[0].queryResult;
      return sendTextMessage(userID, result);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};
