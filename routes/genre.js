const Joi = require('joi')
const express = require('express')
const router = express.Router()
const GENRE_MODEL = require('../model/genreModel')


router.get('/', async (req, res) => {
    const GENRE = await GENRE_MODEL.find()
    .sort('name')
    res.send(GENRE)
})

router.get('/:id', async (req, res) => {
    const GENRE = await GENRE_MODEL.findById(req.params.id)
    
    if(!GENRE) return res.status(404).send('Requested genre not found')

    res.send(GENRE)
})

router.post('/', async (req, res) => {
    //validation
    const RESULT = validateGenre(req.body)

    if(RESULT.error){
        return res.status(400).send(RESULT.error.details[0].message)
    }

    let newGenre = new GENRE_MODEL({
        name: req.body.name,
        tags: req.body.tags
    })

    try{
        newGenre = await newGenre.save();
        res.send(newGenre)
    } catch(err){
        console.log(err)
    }

})

router.put('/:id', async (req, res) => {

    //validation
    const RESULT = validateGenre(req.body)

    if(RESULT.error){
        return res.status(400).send(RESULT.error.details[0].message)
    }

    let updatedGenre = await GENRE_MODEL.findByIdAndUpdate(req.params.id)
    
    if(!updatedGenre){
        return res.status(404).send('Genre does not exist');
    }
    else{
        updatedGenre.set({
            name: req.body.name,
            tags: req.body.tags
        })
    }

    try{
        updatedGenre = await updatedGenre.save()
        res.send(updatedGenre)
    }
    catch(err){
        console.log(err)
    }

})

router.delete('/:id', async (req, res) => {
    
    const DELETED_GENRE = await GENRE_MODEL.findByIdAndRemove({_id: req.params.id})
    
    if(!DELETED_GENRE){
        return res.status(404).send('Genre does not exist');
    }

    res.send(DELETED_GENRE)

})

const validateGenre = (request) => {
    const SCHEMA = Joi.object({
        name: Joi.string().min(3).required(),
        tags: Joi.array()
    })
    return RESULT = SCHEMA.validate(request)
}



module.exports = router;