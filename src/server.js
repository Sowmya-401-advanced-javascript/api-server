'use strict';

const express = require('express');
const app = express();

//our middleware
const notFoundHandler = require('./error-handlers/404');
const serverError = require('./error-handlers/500');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('I am connected');
});



// error handlers
app.use('*', notFoundHandler); // 404 not found if we don't hit a route we made
app.use(serverError); // 500 error when something throws an error

module.exports = {
    server: app,
    start: port => {
        if(!port) {throw new Error('missing port');}
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        })
    }
}