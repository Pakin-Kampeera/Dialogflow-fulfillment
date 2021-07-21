require('dotenv').config();

const express = require('express');
const initWebhook = require('./routes/webhook');
const connectDB = require('./config/db');
const app = express();

app.use(express.json());

connectDB();

initWebhook(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
