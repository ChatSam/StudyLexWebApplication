/**
 * Created by Chat on 7/24/16..
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//setting up the schema for the flash cards data model

var instructionSchema = new Schema({
    manual: {type: String, required: true},
    stepnumber: {type: String, required: true},
    instruction: {type: String, required: true},
    helplevelone: {type: String},
    helpleveltwo: {type: String},
    instructionOwner: {type: String, required: true}
});

module.exports = mongoose.model('instructionModel', instructionSchema);
