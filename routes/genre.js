const express = require('express')
const router = express.Router()

const GENRES = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Action"},
    {id: 4, name: "Romance"},
    {id: 5, name: "Sci-Fi"},
    {id: 6, name: "Drama"}
]


router.get('/', (req, res) => {
    res.send(GENRES)
})

router.get('/:id', (req, res) => {
    const MATCH = GENRES.find((foundGenre) => foundGenre.id === parseInt(req.params.id))
    
    if(!MATCH) return res.status(404).send('Requested genre not found')
    res.send(MATCH)
})

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    
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


module.exports = router;