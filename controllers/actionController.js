const axios = require('axios').default;
const token = process.env.FACEBOOK_ACCESS_TOKEN;

const typingAction = (userID) => {
    axios
        .post(
            `https://graph.facebook.com/v2.6/me/messages?access_token=${token}`,
            {
                recipient: {
                    id: userID
                },
                sender_action: 'typing_on'
            }
        )
        .catch(function (error) {
            console.log('Typing action fail');
        });
};

const markSeenAction = (userID) => {
    axios
        .post(
            `https://graph.facebook.com/v2.6/me/messages?access_token=${token}`,
            {
                recipient: {
                    id: userID
                },
                sender_action: 'mark_seen'
            }
        )
        .catch(function (error) {
            console.log('Mark seen action fail');
        });
};

const sendMessage = (userID, text) => {
    axios
        .post(
            `https://graph.facebook.com/v11.0/me/messages?access_token=${token}`,
            {
                recipient: {
                    id: userID
                },
                messaging_type: 'RESPONSE',
                message: {
                    text
                }
            }
        )
        .catch(function (error) {
            console.log('Message could not be sent');
        });
};

const sendImage = (userID, url) => {
    axios
        .post(
            `https://graph.facebook.com/v11.0/me/messages?access_token=${token}`,
            {
                recipient: {
                    id: userID
                },
                message: {
                    attachment: {
                        type: 'image',
                        payload: {
                            url,
                            is_reusable: true
                        }
                    }
                }
            }
        )
        .catch(function (error) {
            console.log('Image could not be sent');
        });
};

const getUserPersona = async (userID) => {
    const response = await axios
        .get(`https://graph.facebook.com/${userID}?access_token=${token}`)
        .catch(function (error) {
            console.log('Persona request fail');
        });
    return response;
};

module.exports = {
    typingAction,
    markSeenAction,
    sendMessage,
    sendImage,
    getUserPersona
};
