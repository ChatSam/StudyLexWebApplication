/**
 * Created by Chat on 7/16/16.
 */
var express = require('express'),
mongoose = require('mongoose'),
router = express.Router(),
path = require('path'),
instructionModel = require('../models/instructionModel'),
passport = require('passport'),
Account = require('../models/account');


var auth = function(req, res, next){
  !req.isAuthenticated() ? res.send(401) : next();
};


/* list all the flashcards */
router.get('/steps', function (req, res) {
    console.log("pulling the cards.");
    console.log(passport);
    passport.authenticate('local')
    instructionModel.find({instructionOwner: req.user._id}, function(err,steps){
        if(err){
            res.send(err.message);
        }
        res.send(steps);
    });
});

/* get a specific flashcard by id*/
router.get('/:id', auth, function (req, res){

    instructionModel.find({
      _id: req.params.id,
      instructionOwner: req.user._id
    },function(err,fcard){
        if(err){
            res.send("Invalid flashcard");
        }
        res.send(fcard);
    });
})

/* sort flashcards by subjects */
router.get('/manual/:task', auth, function (req, res, next){

    instructionModel.find({subject: req.params.subject},function(err,fcard){
        if(err) {
            res.send("No such subject");
        }
        res.send(fcard);
    });
})

router.post('/create', auth, function(req, res){
    console.log("create the instruction.")
    // console.log(req, res, req.body, res.body);
    var newInstruction = req.body;

    var instruction = new instructionModel(newInstruction);

    instruction.instructionOwner = req.user._id;

    instruction.save(function(err,data){
        if(err){
            res.send("Error ");
        }
        res.json(data);

    });
})

router.post('/update/', auth, function(req, res, next){
    console.log("update the instruction.");
    console.log(passport);
    var newInstruction = req.body;
    instructionModel.findById(newInstruction._id,function (err, instructionData) {
        if(err){
            res.send("can't find flash card");

        }else{
            instructionData.manual = newInstruction.manual;
            instructionData.stepnumber = newInstruction.stepnumber;
            instructionData.instruction = newInstruction.instruction;
            instructionData.helplevelone = newInstruction.helplevelone;
            instructionData.helpleveltwo = newInstruction.helpleveltwo;

            instructionData.save(function(err,data){
                if(err){
                    res.send("Error ");
                }
                res.json(data);
            });
        }
    });
})

router.delete('/delete/:id', auth, function(req, res){
    console.log("delete the cards.")
    instructionModel.find({_id: req.params.id},function(err,instruction){
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


module.exports = router;
