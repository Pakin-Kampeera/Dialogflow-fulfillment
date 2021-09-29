const mongoose = require('mongoose');

const nonStressSchema = new mongoose.Schema({
    text: String,
    value: Number
});

const nonStressWords = mongoose.model('NonStressWord', nonStressSchema);

module.exports = nonStressWords;
