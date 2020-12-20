'use strict';

// const model = require('./food-model');

class Collection {
    constructor(model){
        this.model = model;
    }


    get(_id) {
        if(_id) {
            return this.model.findOne({_id});
        } else {
            return this.model.find({});
            
        }
    }

    create(record) {
        console.log(record);
        let newRecord = new this.model(record);
        return newRecord.save();
    }

    update(_id, record) {
        return this.model.findByIdAndUpdate(_id, record, {new: true});
    }

    delete(_id) {
        return this.model.findByIdAndDelete(_id);
    }
}

module.exports = Collection;
