module.exports = function(app, angularPath) {
    var demo = require('./demo')();
    app.get('/data/test', demo.test);

    var cards = require('./cards')();
    app.get('/data/cards', cards.cardList);

    app.get("*", function(req, res) {
        res.sendFile("index.html", { root: angularPath });
    });
}