/**
 * Created by Chat on 7/16/16.
 */
var express = require('express'),
mongoose = require('mongoose'),
router = express.Router(),
path = require('path'),
flashCardsModel = require('../models/flashCardsModel'),
passport = require('passport'),
Account = require('../models/account');


var auth = function(req, res, next){
  !req.isAuthenticated() ? res.send(401) : next();
};


/* list all the flashcards */
router.get('/cards', auth, function (req, res) {
    console.log("pulling the cards.");
    console.log(passport);

    flashCardsModel.find({cardOwner: req.user._id},function(err,fcard){
        if(err){
            res.send(err.message);
        }
        res.send(fcard);
    });
});

/* get a specific flashcard by id*/
router.get('/:id', auth, function (req, res){

    flashCardsModel.find({
      _id: req.params.id,
      cardOwner: req.user._id
    },function(err,fcard){
        if(err){
            res.send("Invalid flashcard");
        }
        res.send(fcard);
    });
})

/* sort flashcards by subjects */
router.get('/subject/:subject', auth, function (req, res, next){

    flashCardsModel.find({
      subject: req.params.subject,
      cardOwner: req.user._id
    },function(err,fcard){
        if(err) {
            res.send("No such subject");
        }
        res.send(fcard);
    });
})

/* load create flashcards view */
router.get('/create',function(request, response, next){

})

router.post('/create', auth, function(req, res){
    var newCard = req.body;
    console.log(newCard);
    var flashCard = new flashCardsModel(newCard);

    flashCard.cardOwner = req.user._id;
    flashCard.save(function(err,data){
        if(err){
            res.send("Error ");
        }
        res.json(data);

    });
})

router.post('/update/', auth, function(req, res, next){
    console.log("update the cards.");
    console.log(passport);
    var newCard = req.body;
    flashCardsModel.findById(newCard._id, function (err, flashCardData) {
        if(err){
            res.send("can't find flash card");

        }else{
            flashCardData.subject = newCard.subject;
            flashCardData.question = newCard.question;
            flashCardData.hint = newCard.hint;
            flashCardData.answer = newCard.answer;
            flashCardData.more = newCard.more;
            flashCardData.cardOwner =  req.user._id;

            flashCardData.save(function(err,data){
                if(err){
                    res.send("Error ");
                }
                res.json(data);
            });
        }
    });
})

/* load delete flashcards view*/
router.get('/delete', function(request, response, next){

})

router.delete('/delete/:id', auth, function(req, res){
    console.log("delete the cards.")
    flashCardsModel.find({
      _id: req.params.id,
      cardOwner: req.user._id
    }, function(err,fcard){
        if(err){
            res.send("Error 1");
        }

    }).remove(function(err){
        if(err){
            res.send(err);
        }

        res.send("Deleted")
    });
})

/* load update flashcards view*/
router.get('/export/:id', auth, function (request, response, next){

      flashCardsModel.find({
        subject: req.params.subject,
        cardOwner: req.user._id
      },function(err,fcard){
          if(err) {
              res.send("No such subject");
          }
          res.send(fcard);
      });

})

module.exports = router;
