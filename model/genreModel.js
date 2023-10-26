const MONGOOSE = require('mongoose')
const GENRE_SCHEMA = require('../schema/genreSchema')

const GENRE_MODULE = MONGOOSE.model('Genre', GENRE_SCHEMA)

module.exports = GENRE_MODULE