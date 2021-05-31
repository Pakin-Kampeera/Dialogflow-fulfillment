require('dotenv').config({ path: './config.env' });
const express = require('express');
const verifyWebhook = require('./verify-webhook');
const messageWebhook = require('./message-webhook');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());

connectDB();

app.get('/', verifyWebhook);

app.post('/', messageWebhook);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
