const MONGOOSE = require('mongoose')

const COURSE_SCHEMA = new MONGOOSE.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

module.exports = COURSE_SCHEMA;