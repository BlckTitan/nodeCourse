const MONGOOSE = require('mongoose');

const GENRE_SCHEMA = new MONGOOSE.Schema({
    name: {type: String, required: true},
    tags: [String],
    date: {type: Date, default: Date.now}
})

module.exports = GENRE_SCHEMA