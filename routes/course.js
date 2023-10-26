const Joi = require('joi')
const express = require('express');
const router = express.Router();
const COURSE_MODEL = require('../model/courseModel');
const { default: mongoose } = require('mongoose');
const COURSE_SCHEMA = require('../schema/courseSchema');

const COURSES = [
    {id: 1, name: 'Maths'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Biology'}
]

//get all courses
router.get('/', async (req, res) => {
    const COURSES = await COURSE_MODEL.find()
    .select({name: 1, author: 1})
    .sort('name')
    res.send(COURSES)
})

//handling get requests
router.get('/:id', async (req, res) => {
    const COURSES = await COURSE_MODEL.findById(req.params.id)
    .select({name: 1, author: 1})
    // const COURSE_MATCH = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSES){
        res.status(404).send('The course with the given ID was not found...')
    }else{
        res.send(COURSES)
    }
})

//post request
router.post('/',  async (req, res) => {

    // validating requests using Joi
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // })


    // const RESULT = schema.validate(req.body)
    let newCourse = new COURSE_MODEL({
        name: req.body.name,
        author: req.body.author,
        isPublished: req.body.isPublished
    })

    try{
        newCourse = await newCourse.save();
        res.send(newCourse);
    } catch(err) {
        return res.status(400).send(err.message);
    }

    // if(RESULT.error){
    //     //400 Bad request
    //    return res.status(400).send(RESULT.error.details[0].message);
       
    // } 

    // const COURSE = {
    //     name: req.body.name,
    // }

    // COURSES.push(COURSE);
})

//put request

router.put('/:id', async (req, res) => {
    // const COURSE = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    // if(!COURSE) return res.status(404).send('Searched course not found')

    // const RESULT = validateRequest(req.body)
    // if(RESULT.error){
    //     return res.status(400).send(RESULT.error.details[0].message)
        
    // }
    
    // COURSE.name = req.body.name
    // res.send(COURSE)
    let updatedCourse = await COURSE_MODEL.findById(req.params.id)

    if(updatedCourse){ 
        updatedCourse.set({
            name: req.body.name,
            author: req.body.author,
            isPublished: req.body.isPublished
        })
    } else{
        return res.status(404).send('THE REQUESTED COURSE WAS NOT FOUND')
    }

    try{
        updatedCourse = await updatedCourse.save()
        res.send(updatedCourse)
    } catch(err){
        console.log(err.message)
    }

})

router.delete('/:id', async (req, res) => {
    // const COURSE = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    // if(!COURSE) return res.status(404).send(`Course with id ${req.params.id} not found`); 

    // const INDEX = COURSES.indexOf(COURSE)
    // COURSES.splice(INDEX, 1)

    // res.send(COURSE);

    let COURSE = await COURSE_MODEL.findByIdAndRemove({_id: req.params.id})
    if(!COURSE){
        res.status(404).send('THE REQUESTED COURSE WAS NOT FOUND')
    }
    res.send(COURSE)
})

const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(3).required()
    })

    return SCHEMA.validate(request)
}

module.exports = router