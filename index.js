// const STARTUP_DEBUGGER = require('debug')('APP:startup')
// const MORGAN = require('morgan')
// const HELMET = require('helmet')
// const LOGGER = require('./middleware/logger')
// const CONFIG = require('config')
// const AUTH = require('./auth');
// const EXPRESS = require('express')
// const APP = EXPRESS();
// const GENRE = require('./routes/genre')
// const COURSE = require('./routes/course')
// const home = require('./routes/home')

//working with mongoDB
const MONGOOSE = require('mongoose');

MONGOOSE.connect('mongodb://127.0.0.1/mongoLesson')
.then(() => console.log('Connected to database'))
.catch((err) => console.error('could not connect to database', err))


const COURSE_SCHEMA = new MONGOOSE.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const COURSE_MODEL = MONGOOSE.model('Course', COURSE_SCHEMA)//returns a class

const createCourse = async () =>{

    const COURSE = new COURSE_MODEL({
        name: 'Angular Course',
        author: 'Eze',
        tags: ['Angular', 'Backend'],
        isPublished: true
    })//creating an object out of the COURSE_MODEL class

    const RESULT = await COURSE.save()
    console.log(RESULT)
}

const getCourses = async () => {
    const COURSES = await COURSE_MODEL.find({author: 'Eze', isPublished: true})
    .limit(10)//number of results returned
    .sort({name: 1})//sort name by ascending order (1 => ascending order, -1 => descending order)
    .select({name: 1, tags: 1}) //return only name and tags 
    console.log(COURSES)
}

getCourses()

// createCourse()
// APP.use(EXPRESS.json())
// APP.use(EXPRESS.urlencoded({extended: true})) 
// APP.use(EXPRESS.static('./public'))
// APP.use(AUTH);
// APP.use(LOGGER);
// APP.use(MORGAN('tiny'));
// APP.use(HELMET());
// APP.use('/api/genre', GENRE)
// APP.use('/api/course', COURSE)
// APP.use('/', home)

// if(APP.get('env') === 'development'){
//     APP.use(MORGAN('tiny'))
//     STARTUP_DEBUGGER('Morgan enabled')
// }

// //templating engine
// APP.set('view engine', 'pug')
// APP.set('views', './views')

// // console.log(`APPlication name: ${CONFIG.get('name')}`)
// // console.log(`Mail server: ${CONFIG.get('dev-mail.host')}`)
// // console.log(`Mail password: ${CONFIG.get('email.password')}`)  


// const PORT = process.env.PORT || 3000;
// APP.listen(PORT, () => console.log(`Listening on ${PORT}`))