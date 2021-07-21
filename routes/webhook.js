const express = require('express');
const {getWebhook, postWebhook} = require('../controllers/messengerController');
const router = express.Router();

const initRoutes = (app) => {
    router.get('/webhook', getWebhook);
    router.post('/webhook', postWebhook);
    return app.use('/', router);
};

module.exports = initRoutes;
