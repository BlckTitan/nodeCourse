const MONGOOSE = require('mongoose')

const COURSE_SCHEMA = new MONGOOSE.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: {type: Boolean, default: false}
})

module.exports = COURSE_SCHEMA;