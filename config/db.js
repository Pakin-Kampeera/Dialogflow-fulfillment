const mongoose = require('mongoose');
const Data = require('../models/data');
const Average = require('../models/average');
const Notification = require('../models/notification');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongoDB connected');
        const oldWidget = await Data.find();
        if (!oldWidget) {
            const widget = await Data.create({});
            await widget.save();
        }
        const oldAverage = await Average.find();
        if (!oldAverage) {
            const average = await Average.create({});
            await average.save();
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
