// const STARTUP_DEBUGGER = require('debug')('APP:startup')
// const MORGAN = require('morgan')
// const HELMET = require('helmet')
// const LOGGER = require('./middleware/logger')
// const CONFIG = require('config')
// const AUTH = require('./auth');
const EXPRESS = require('express')
const APP = EXPRESS();
// const GENRE = require('./routes/genre')
const COURSE = require('./routes/course')
// const home = require('./routes/home')


APP.use(EXPRESS.json())
APP.use('/api/course', COURSE)

//working with mongoDB
const MONGOOSE = require('mongoose');
const COURSE_MODEL = require('./model/courseModel');

MONGOOSE.connect('mongodb://127.0.0.1/mongoLesson')
.then(() => console.log('Connected to database'))
.catch((err) => console.error('could not connect to database', err))

const createCourse = async () =>{

    const COURSE = new COURSE_MODEL({
        name: 'Vue Course',
        author: 'Eze',
        tags: ['Express', 'Frontend'],
        isPublished: true
    })//creating an object out of the COURSE_MODEL class

    try{
        const RESULT = await COURSE.save()
        console.log(RESULT)
    } catch(err){
        console.log(err.message)
    }
}

const getCourses = async () => {
    const COURSES = await COURSE_MODEL.find({author: 'Eze', isPublished: true})
    .limit(10)//number of results returned
    .sort({name: 1})//sort name by ascending order (1 => ascending order, -1 => descending order)
    .select({name: 1, tags: 1}) //return only name and tags 

    APP.get()
    console.log(COURSES)
}

//QUERY FRIST UPDATE APPROACH


// const updateCourses = async (id) => {
//     const COURSES = await COURSE_MODEL.findById(id);

//     if(!COURSES) return console.log('query failed');

//     COURSES.set({
//         isPublished: true,
//         author: 'Mr Victor'
//     })

//     try{
        //     const RESULT = await COURSES.save()
        //     console.log(RESULT)
        // } catch(err){
        //     console.log(err.message)
        // }

// }


// UPDATE FIRST OPERATION


const updateCourses = async (id) => {
    const RESULT = await COURSE_MODEL.findByIdAndUpdate({_id: id}, {
        $set: {
            author: 'Eze',
            isPublished: false
        }
    }, {new: true});

    // try{
    //     const RESULT = await COURSE.save()
    //     console.log(RESULT)
    // } catch(err){
    //     console.log(err.message)
    // }
}

// DELETE OPERATION

const deleteCourses = async (id) => {
    const RESULT = await COURSE_MODEL.deleteOne({_id: id})

    //  
}

// deleteCourses("653231a62ea08ca5ca45548a")
// updateCourses("653231a62ea08ca5ca45548a")
// getCourses()
// createCourse()

// APP.use(EXPRESS.json())
// APP.use(EXPRESS.urlencoded({extended: true})) 
// APP.use(EXPRESS.static('./public'))
// APP.use(AUTH);
// APP.use(LOGGER);
// APP.use(MORGAN('tiny'));
// APP.use(HELMET());
// APP.use('/api/genre', GENRE)
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


const PORT = process.env.PORT || 3000;
APP.listen(PORT, () => console.log(`Listening on ${PORT}`))