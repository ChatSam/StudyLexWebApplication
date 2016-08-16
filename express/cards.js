module.exports = function() { 

    var http = require('http');

    return {
        cardList: cardList
    };

    function cardList(req, res) {
        res.send([
            {
                question: "who is the first president of the United States",
                answer: "George Washington"
            },
            {
                question: "when did america claim kits independence",
                answer: "1776"
            },
            {
                question: "who wrote the declaration of independence",
                answer: "Thomas Jefferson"
            }
        ]);
    }
}