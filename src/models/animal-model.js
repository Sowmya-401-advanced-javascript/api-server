'use strict';

const mongoose = require('mongoose');

// 1. make a schema

const animalSchema = mongoose.Schema({
    name: { type: String, required: true },
    class: { type: String, required: true}, // e.g., Mammal or Reptile
    order: { type: String, uppercase: true, enum: ['CARNIVORE', 'HERBIVORE', 'OMNIVORE']}
});

// 2. export this schema as a model
const animalModel = mongoose.model('animal', animalSchema);

module.exports = animalModel;