module.exports = function(app, angularPath) {
    var demo = require('./demo')();
    app.get('/data/test', demo.test)

    app.get("*", function(req, res) {
        res.sendFile("index.html", { root: angularPath });
    })
}