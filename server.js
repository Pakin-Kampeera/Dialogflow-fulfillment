require('dotenv').config({path: './.env.prod'});

const express = require('express');
const webhook = require('./routes/webhook');
const connectDB = require('./config/db');
const notification = require('./controllers/scheduleController');
const app = express();

app.use(express.json());

connectDB();

notification.startJob();

app.use('/', webhook);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
