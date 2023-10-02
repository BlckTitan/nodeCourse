const logger = require('./logger')
const auth = require('./auth');
const express = require('express')
const app = express();


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(auth);
app.use(logger);

app.get('/', (req, res) => {
    console.log('serving...')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))