'use strict';

const express = require('express');
const Foods = require('../models/food-model'); 
const DataCollection = require('../models/data-collection-class')
const foods = new DataCollection(Foods);


const foodRouter = express.Router();

// Restful routes
foodRouter.get('/food', getFood);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', createFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

// RESTful route handlers
async function getFood(req, res) {
    const allFood = await foods.get()
    console.log(allFood);
    res.status(200).json(allFood);
}

async function getOneFood(req, res) {
    const id = req.params.id;
    const oneFood = await foods.get(id);
    res.status(200).json(oneFood);
}

async function createFood(req, res) {
    const obj = req.body;
    console.log(obj);
    
    const newFood = await foods.create(obj)
    res.status(200).json(newFood);
}

async function updateFood(req, res) {
    const id = req.params.id;
    const foodObjToBeUpdated = req.body;
    const newUpdatedFood = await foods.update(id, foodObjToBeUpdated);
    res.status(200).json(newUpdatedFood);
}

async function deleteFood(req, res) {
    await foods.delete(req.params.id);
    res.status(200).send('deleting food');
}

module.exports = foodRouter;
