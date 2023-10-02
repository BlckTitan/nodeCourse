const Joi = require('joi');
const express = require('express')
const app = express();


app.use(express.json())

const GENRES = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Action"},
    {id: 4, name: "Romance"},
    {id: 5, name: "Sci-Fi"},
    {id: 6, name: "Drama"}
]

app.get('/api/genre', (req, res) => {
    res.send(GENRES)
})

app.get('/api/genre/:id', (req, res) => {
    const MATCH = GENRES.find((foundGenre) => foundGenre.id === parseInt(req.params.id))
    
    if(!MATCH) return res.status(404).send('Requested genre not found')
    res.send(MATCH)
})

app.post('/api/genre', (req, res) => {
    //validation
    const RESULT = validateGenre(req.body)
    if(RESULT.error){
        return res.status(400).send(RESULT.error.details[0].message)
    }

    const NEW_GENRE = {
        id: GENRES.length + 1,
        name: req.body.name
    }

    GENRES.push(NEW_GENRE);
    res.send(NEW_GENRE)

})

app.put('/api/genre/:id', (req, res) => {
    //validation
    const RESULT = validateGenre(req.body)
    if(RESULT.error){
        return res.status(400).send(RESULT.error.details[0].message)
    }

    const MATCH = GENRES.find((foundGenre) => foundGenre.id === parseInt(req.params.id))
    
    if(!MATCH){
        return res.status(404).send('Genre does not exist');
    }
    MATCH.name = req.body.name

    res.send(MATCH)

})

app.delete('/api/genre/:id', (req, res) => {
    
    const MATCH = GENRES.find((foundGenre) => foundGenre.id === parseInt(req.params.id))
    
    if(!MATCH){
        return res.status(404).send('Genre does not exist');
    }
    
    const INDEX = GENRES.indexOf(MATCH)
    GENRES.splice(INDEX, 1)

    res.send(MATCH)

})

const validateGenre = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(3).required()
    })
    return RESULT = SCHEMA.validate(request)
}

const  port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));