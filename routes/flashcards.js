/**
 * Created by Chat on 7/16/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require ('fs');
var path = require('path')



fs.readdirSync('/Drive D/Alexa/StudyLexa/webApp/models/').forEach(function(filename) {
    if (~filename.indexOf('.js')) require('/Drive D/Alexa/StudyLexa/webApp/models/'+filename);
});

var flashCardsModel = mongoose.model('flashCardsModel');

/* list all the flashcards */
router.get('/',function (req,res, next) {

    flashCardsModel.find(function(err,fcard){
        if(err){
            res.send(err);
        }
        res.send(fcard);
    });
})


/* get a specific flashcard by id*/
router.get('/:id',function (req, res){

    flashCardsModel.find({_id: req.params.id},function(err,fcard){
        if(err){
            res.send(err);
        }
        res.send(fcard);

    });
})


/* sort flashcards by subjects */
router.get('/subject/:subject', function (req, res, next){

    flashCardsModel.find({subject: req.params.subject},function(err,fcard){
        if(err) {
            res.send(err);
        }
        res.send(fcard);
    });
})


/* load create flashcards view */
router.get('/create',function(request, response, next){

})

router.post('/create',function(req, res){
    var newCard = req.body;

    console.log(newCard);

    //var fcard = new flashCard(newCard);
    var flashCard = new flashCardsModel(newCard);

    flashCard.save(function(err,data){
        if(err){
            res.json(err)
        }
        res.json(data);

    });

})


/* load update flashcards view*/
router.get('/update',function (request, response, next){

})

router.post('/update/:id',function(req, res, next){
    flashCardsModel.findByIdAndUpdate(req.params.id,{$set:req.body},function (err, data) {
        if(err){
            return handleError(err);
        }

        res.send(data);
    });

})

/* load delete flashcards view*/
router.get('/delete', function(request, response, next){

})


router.delete('/delete/:id', function(req, res){

    flashCardsModel.find({_id: req.params.id},function(err,fcard){
        if(err){
            res.send(err);
        }

    }).remove(function(err){
        if(err) throw err;

        res.send("Deleted")
    });


})


module.exports = router;