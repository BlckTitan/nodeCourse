const express = require('express');
const app = express();


const COURSES = [
    {id: 1, course: 'Maths'},
    {id: 2, course: 'English'},
    {id: 3, course: 'Biology'}
]

app.get('/', (req, res ) => {
    res.send('Hello World')
})

app.get('/again', (req, res) => {
    res.send([1, 2, 3, 4, 5])
})

app.get('/blog/:month/:year', (req, res) => {
    res.send(req.params)
})

app.get('/posts/:month/:year', (req, res) => {
    res.send(req.query)
})

app.get('/courses', (req, res) => {
    res.send(COURSES)
})
app.get('/courses/:id', (req, res) => {
    const COURSE_MATCH = COURSES.find((foundCourse) => foundCourse.id === parseInt(req.params.id));
    if(!COURSE_MATCH){
        res.status(404).send('The course with the given ID was not found...')
    }else{
        res.send(COURSE_MATCH)
    }
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`))