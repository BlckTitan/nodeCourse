const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./logger')
const config = require('config')
const auth = require('./auth');
const express = require('express')
const app = express();


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(auth);
app.use(logger);
app.use(morgan('tiny'));
app.use(helmet());

if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    console.log('Morgan enabled')
}

const GENRES = [
    {id: 1, name: "Horror"},
    {id: 2, name: "Comedy"},
    {id: 3, name: "Action"},
    {id: 4, name: "Romance"},
    {id: 5, name: "Sci-Fi"},
    {id: 6, name: "Drama"}
]

console.log(`Application name: ${config.get('name')}`)
console.log(`Mail server: ${config.get('mail.host')}`)
console.log(`Mail password: ${config.get('mail.password')}`)

app.get('/', (req, res) => {
    console.log('serving...')
})

app.get('/api/mid', (req, res) => {
    res.send(GENRES)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))