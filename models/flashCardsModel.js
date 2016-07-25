/**
 * Created by Chat on 7/24/16.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//setting up the schema for the flash cards data model

var flashCardSchema = new Schema({
    card: String,
    question: String,
    answer: String,
    hint: String,
    more: String,
    subject: String
});



mongoose.model('flashCardsModel', flashCardSchema);
