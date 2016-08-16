/**
 * Created by Chat on 7/16/16.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require ('fs');
var path = require('path');
var FlashCardsModel = require('../models/flashCardsModel');

module.exports = function(app) {
  /* list all the flashcards */
  app.get('/',function (req,res, next) {
      console.log("pulling the cards.")
      flashCardsModel.find(function(err,fcard){
          if(err){
              res.send(err.message);
          }
          res.send(fcard);
      });
  });

  /* get a specific flashcard by id*/
  app.get('/:id',function (req, res){

      flashCardsModel.find({_id: req.params.id},function(err,fcard){
          if(err){
              res.send("Invalid flashcard");
          }
          res.send(fcard);
      });
  })

  /* sort flashcards by subjects */
  app.get('/subject/:subject', function (req, res, next){

      flashCardsModel.find({subject: req.params.subject},function(err,fcard){
          if(err) {
              res.send("No such subject");
          }
          res.send(fcard);
      });
  })

  /* load create flashcards view */
  app.get('/create',function(request, response, next){

  })

  app.post('/create',function(req, res){
      var newCard = req.body;

      console.log(newCard);

      var flashCard = new flashCardsModel(newCard);

      flashCard.save(function(err,data){
          if(err){
              res.send("Error ");
          }
          res.json(data);

      });
  })

  /* load update flashcards view*/
  app.get('/update',function (request, response, next){

  })

  app.post('/update/',function(req, res, next){

      var newCard = req.body;
      flashCardsModel.findById(newCard._id,function (err, flashCardData) {
          if(err){
              res.send("can't find flash card");

          }else{
              console.log(newCard.question);
              flashCardData.subject = newCard.subject;
              flashCardData.question = newCard.question;
              flashCardData.hint = newCard.hint;
              flashCardData.answer = newCard.answer;
              flashCardData.more = newCard.more;

              console.log(flashCardData);

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
  app.get('/delete', function(request, response, next){

  })

  app.delete('/delete/:id', function(req, res){

      flashCardsModel.find({_id: req.params.id},function(err,fcard){
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

};

// module.exports = router;
