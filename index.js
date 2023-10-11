const startupDebugger = require('debug')('app:startup')
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('./logger')
const config = require('config')
const auth = require('./auth');
const express = require('express')
const app = express();
const genre = require('./routes/genre')
const course = require('./routes/course')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('./public'))
app.use(auth);
app.use(logger);
app.use(morgan('tiny'));
app.use(helmet());
app.use('/api/genre', genre)
app.use('/api/course', course)

if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    startupDebugger('Morgan enabled')
}

//templating engine
app.set('view engine', 'pug')
app.set('views', './views')

// console.log(`Application name: ${config.get('name')}`)
// console.log(`Mail server: ${config.get('dev-mail.host')}`)
// console.log(`Mail password: ${config.get('email.password')}`)  

app.get('/', (req, res) => {
    // console.log('serving...')
    res.render('index', {title: "My express App", message: "HTML Markup"})
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))