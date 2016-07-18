/**
 * Created by Chat on 7/16/16.
 */
var express = require('express');
var router = express.Router();


var flashcardDataSet  =
    [{
        id:1,
        question:"Which animal is known as the king of the jungle?",
        answer: "Lion",
        hint:"There is a disney cartoon trilogy featuring this animal",
        more:"This animal is a carnivore",
        subject:"Animals"
    },{
        id:2,
        question:"Who is dubbed the fastest man on earth?",
        answer: "Usain Bolt",
        hint:"He is from Jamaica",
        more:"This person holds the fastest 100m and 200m sprint in track.",
        subject:"Sports"
    }];

/* list all the flashcards */
router.get('/',function (request,response, next) {
    response.send(flashcardDataSet);
})


/* get a specific flashcard by id*/
router.get('/:id',function (req, res){

     for(var card in flashcardDataSet){

         var currentCard = flashcardDataSet[card]

        if(currentCard.id.toString() === req.params.id.toString()) {
            res.status(200).send(currentCard);
            console.log(currentCard)
            //break;
        }
    }
})


/* sort flashcards by subjects */
router.get('/subject/:subject', function (request, response, next){
    for(var card in flashcardDataSet){

        var currentCard = flashcardDataSet[card]

        if(currentCard.subject.toString() === request.params.subject.toString()) {
            response.status(200).send(currentCard);
            console.log(currentCard)
            //break;
        }
    }
})


/* create flashcards */
router.get('/create',function(request, response, next){

})

router.post('/create',function(req, res){
    var newCard = req.body;

    console.log(newCard);

    flashcardDataSet.push(newCard);

    res.status(200).send(flashcardDataSet)
})


/* update flashcards*/
router.get('/update',function (request, response, next){

})

router.post('/update',function(request, response, next){

})

/* delete flashcards */
router.get('/delete', function(request, response, next){

})


router.post('/delete/:id', function(request, response, next){
    for(var card in flashcardDataSet){

        var currentCard = flashcardDataSet[card]

        if(currentCard.id.toString() === request.params.id.toString()) {

            //flashcardDataSet[card].remove();

            response.status(200).send(flashcardDataSet);
            //break;
        }
    }
})


module.exports = router;