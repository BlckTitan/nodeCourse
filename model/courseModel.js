const MONGOOSE = require('mongoose')
const COURSE_SCHEMA = require('../schema/courseSchema')


const COURSE_MODEL = MONGOOSE.model('Course', COURSE_SCHEMA)//returns a class

module.exports = COURSE_MODEL;