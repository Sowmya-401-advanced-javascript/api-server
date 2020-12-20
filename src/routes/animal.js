'use strict';

const express = require('express');
const Animals = require('../models/animal-model');
const DataCollection = require('../models/data-collection-class')
const animals = new DataCollection(Animals);


const animalRouter = express.Router();

// Restful routes
animalRouter.get('/animal', getAnimal);
animalRouter.get('/animal/:id', getOneAnimal);
animalRouter.post('/animal', createAnimal);
animalRouter.put('/animal/:id', updateAnimal);
animalRouter.delete('/animal/:id', deleteAnimal);

// RESTful route handlers
async function getAnimal(req, res) {
    const allAnimals = await animals.get()
    console.log(allAnimals);
    res.status(200).json(allAnimals);
}

async function getOneAnimal(req, res) {
    const id = req.params.id;
    const oneAnimal = await animals.get(id);
    res.status(200).json(oneAnimal);
}

async function createAnimal(req, res) {
    const obj = req.body;
    console.log(obj);
    const newAnimal = await animals.create(obj)
    res.status(200).json(newAnimal);
}

async function updateAnimal(req, res) {
    const newIDToBeGiven = req.params.id;
    const AnimalObjToBeUpdated = req.body;
    const newUpdatedAnimal = await animals.update(newIDToBeGiven, AnimalObjToBeUpdated);
    res.status(200).json(newUpdatedAnimal);
}

async function deleteAnimal(req, res) {
    await animals.delete(req.params.id);
    res.status(200).send('deleting Animal');
}

module.exports = animalRouter;
