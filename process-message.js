const fetch = require('node-fetch');

const projectID = 'fbmessengerbot-ulur';
const sessionID = '123456';
const languageCode = 'en-US';

const dialogflow = require('dialogflow');

const config = {
  credentials: { private_key: process.env.DIALOGFLOW_PRIVATE_KEY, client_email: process.env.DIALOGFLOW_CLIENT_EMAIL },
};

const sessionClient = new dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectID, sessionID);

console.log(sessionPath);

const FB_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

const sendTextMessage = (userID, text) => {
  return fetch(`https://graph.facebook.com/v10.0/me/messages?access_token=${FB_ACCESS_TOKEN}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ messaging_type: 'RESPONSE', recipient: { id: userID }, message: { text } }),
  });
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
      return sendTextMessage(userID, result.fulfillmentText);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
};
