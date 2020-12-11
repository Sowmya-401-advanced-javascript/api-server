'use strict';

function serverError(err, req, res, next){
    res.status(404).send('server error', err);
}

module.exports = serverError;