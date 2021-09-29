const express = require('express');
const {getWebhook, postWebhook} = require('../controllers/messengerController');
const router = express.Router();

router.get('/webhook', getWebhook);
router.post('/webhook', postWebhook);

module.exports = router;
