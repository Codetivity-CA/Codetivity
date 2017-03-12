#!/usr/bin/env node

/*
  NOTES
  - path.join lets you join many different arguments to create the file path
  - __dirname is the current directory you're in
  - in pathnames, separate each folder as a separate argument
  - middleware function (app.use()) take 3 parameters, req, res and next

 */

/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path'); // This lets you use file paths as a response  i.e. res.sendFile("./filename.txt")
var debug = require('debug')('codetivity:server');
var http = require('http');
var favicon = require('serve-favicon');
var firebase = require('./routes/firebase');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();


/**
 * Get port from environment and store in Express
 */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);


/**
 * Set rendering engine to ejs
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/**
 * Setup middleware
 */
app.use(function(req, res, next){
  console.log(req.method, req.url); // Requested method (i.e. get/post) and requested URL
    next();
});
app.use(favicon(__dirname + '/public/images/favicon.ico'));
// Treats the public folder as static content (things to serve to the user)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));                          
app.use('/', firebase); // Only runs if request is made in / directory
app.use('/', index);
app.use('/users', users);


/**
 * Error handling (404 stuff)
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500); // respond with 404 or 500, whichever is initialized
    res.render('error');
});


/**
 * Create HTTP server.
 */
var server = http.createServer(app);


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
