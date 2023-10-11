const Joi = require('joi')
const express = require('express');
const router = express.Router();


const COURSES = [
    {id: 1, name: 'Maths'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Biology'}
]
//get all courses
router.get('/', (req, res) => {
    res.send(COURSES)
})

//handling get requests
router.get('/:id', (req, res) => {
    const COURSE_MATCH = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE_MATCH){
        res.status(404).send('The course with the given ID was not found...')
    }else{
        res.send(COURSE_MATCH)
    }
})

//post request
router.post('/', (req, res) => {

    //validating requests using Joi
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })


    const RESULT = schema.validate(req.body)
    

    if(RESULT.error){
        //400 Bad request
       return res.status(400).send(RESULT.error.details[0].message);
        
    }

    const COURSE = {
        id: COURSES.length + 1,
        name: req.body.name
    }

    COURSES.push(COURSE);
    res.send(COURSE);
})

//put request

router.put('/:id', (req, res) => {
    const COURSE = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE) return res.status(404).send('Searched course not found')

    const RESULT = validateRequest(req.body)
    if(RESULT.error){
        return res.status(400).send(RESULT.error.details[0].message)
        
    }
    
    COURSE.name = req.body.name
    res.send(COURSE)

})

router.delete('/:id', (req, res) => {
    const COURSE = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE) return res.status(404).send(`Course with id ${req.params.id} not found`); 

    const INDEX = COURSES.indexOf(COURSE)
    COURSES.splice(INDEX, 1)

    res.send(COURSE);

})

const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(3).required()
    })

    return SCHEMA.validate(request)
}

module.exports = router