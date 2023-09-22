//const EventEmitter = require('events');
//var logger = require('path');
//const OS = require('os');
//const FS = require('fs');

//const files = FS.readdirSync('./')
/*const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged', function(arg){
    console.log('listener called', arg)
})
logger.log('message to the log function'); */
/*FS.readdir('./', function(err, files){
    if(err) console.log('Error', err)
    else console.log('result', files)
})
*/
/*var pathObj = logger.parse(__filename)
let totalMemory = OS.totalmem()
let freeMemory = OS.freemem()
let upTime = OS.uptime()*/
//console.log(files )

const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('hello world')
        res.end();
    }
})
server.listen(3000)