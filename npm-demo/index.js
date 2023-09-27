const Joi = require('joi')
const express = require('express');
const app = express();

app.use(express.json());


const COURSES = [
    {id: 1, name: 'Maths'},
    {id: 2, name: 'English'},
    {id: 3, name: 'Biology'}
]


//sending http requests

app.get('/', (req, res ) => {
    res.send('Hello World')
})

app.get('/api/again', (req, res) => {
    res.send([1, 2, 3, 4, 5])
})

app.get('/api/blog/:month/:year', (req, res) => {
    res.send(req.params)
})

app.get('/api/posts/:month/:year', (req, res) => {
    res.send(req.query)
})

app.get('/api/courses', (req, res) => {
    res.send(COURSES)
})

//handling gete requests

app.get('/api/courses/:id', (req, res) => {
    const COURSE_MATCH = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE_MATCH){
        res.status(404).send('The course with the given ID was not found...')
    }else{
        res.send(COURSE_MATCH)
    }
})

//post request
app.post('/api/courses', (req, res) => {

    //validating requests using Joi
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })


    const RESULT = schema.validate(req.body)
    

    if(RESULT.error){
        //400 Bad request
        res.status(400).send(RESULT.error.details[0].message);
        return
    }

    const COURSE = {
        id: COURSES.length + 1,
        name: req.body.name
    }

    COURSES.push(COURSE);
    res.send(COURSE);
})

//put request

app.put('/api/courses/:id', (req, res) => {
    const COURSE = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE) return res.status(404).send('Searched course not found')

    const RESULT = validateRequest(req.body)
    if(RESULT.error){
        res.status(400).send(RESULT.error.details[0].message)
        return;
    }
    
    COURSE.name = req.body.name
    res.send(COURSE)

})


const validateRequest = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(3).required()
    })

    return SCHEMA.validate(request)
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`))