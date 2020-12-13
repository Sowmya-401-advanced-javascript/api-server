'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(process.env.MONGOOSE_URI, options);

const logger = require('./middleware/logger');
const notFoundHandler = require('./error-handlers/404');
const serverError = require('./error-handlers/500');
const foodRouter = require('./routes/food');

app.use(express.json());
// app.use(logger);
app.use(foodRouter);

app.get('/', (req, res) => {
    res.status(200).send('Hello World');
});

// error handlers
app.use('*', notFoundHandler); // 404 not found if we don't hit a route we made
// app.use(serverError); // 500 error when something throws an error

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('I am connected');
});

module.exports = {
    server: app,
    start: port => {
        if(!port) {throw new Error('missing port');}
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        })
    }
}