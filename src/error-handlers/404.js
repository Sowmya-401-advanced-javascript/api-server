'use strict';

function notFoundHandler(req, res, next){
    res.status(404).send('resourse not found');
}

module.exports = notFoundHandler;