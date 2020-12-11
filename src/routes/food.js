const express = require('express');
const Foods = require('../models/food-model');
const foods = new Foods();

const foodRouter = express.Router();

// Restful routes
foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

// RESTful route handlers
function getFood(req, res) {
    const allFood = foods.get()
    res.status(200).json(allFood);
}

function getOneFood(req, res) {
    const id = req.params.id;
    const oneFood = foods.get(id);
    res.status(200).json(oneFood);
}

function createFood(req, res) {
    const obj = req.body;
    const newFood = foods.create(obj)
    res.status(200).json(newFood);
}

function updateFood(req, res) {
    res.status(200).send('updating food');
}

function deleteFood(req, res) {
    res.status(200).send('deleting food');
}

module.exports = foodRouter;
