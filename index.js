const STARTUP_DEBUGGER = require('debug')('APP:startup')
const MORGAN = require('morgan')
const HELMET = require('helmet')
const LOGGER = require('./middleware/logger')
const CONFIG = require('config')
const AUTH = require('./auth');
const EXPRESS = require('express')
const APP = EXPRESS();
const GENRE = require('./routes/genre')
const COURSE = require('./routes/course')
const home = require('./routes/home')

APP.use(EXPRESS.json())
APP.use(EXPRESS.urlencoded({extended: true}))
APP.use(EXPRESS.static('./public'))
APP.use(AUTH);
APP.use(LOGGER);
APP.use(MORGAN('tiny'));
APP.use(HELMET());
APP.use('/api/genre', GENRE)
APP.use('/api/course', COURSE)
APP.use('/', home)

if(APP.get('env') === 'development'){
    APP.use(MORGAN('tiny'))
    STARTUP_DEBUGGER('Morgan enabled')
}

//templating engine
APP.set('view engine', 'pug')
APP.set('views', './views')

// console.log(`APPlication name: ${CONFIG.get('name')}`)
// console.log(`Mail server: ${CONFIG.get('dev-mail.host')}`)
// console.log(`Mail password: ${CONFIG.get('email.password')}`)  


const PORT = process.env.PORT || 3000;
APP.listen(PORT, () => console.log(`Listening on ${PORT}`))