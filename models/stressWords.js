const mongoose = require('mongoose');

const stressSchema = new mongoose.Schema({
    text: String,
    value: Number
});

const stressWords = mongoose.model('StressWord', stressSchema);

module.exports = stressWords;
