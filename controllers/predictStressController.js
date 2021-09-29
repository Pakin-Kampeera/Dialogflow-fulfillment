const axios = require('axios').default;
const storeData = require('./dataController');

const predictStress = async (event) => {
    message_series = event.message.text
        .replace(/([.?!])\s*(?=[A-Z])/g, '$1|')
        .split('|');
    console.log(message_series);
    const {data} = await axios
        .post(
            process.env.STRESS_PREDICT_URL,
            {
                series: message_series
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .catch(function (error) {
            console.log('Prediction fail');
        });
    storeData(event, data);
};

module.exports = predictStress;
