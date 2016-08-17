var express = require('express'),
    // debug = require('debug')('elev8-web-app:server'),
    path = require('path'),
    app = express();

var staticPath = path.join(__dirname, '/app');
console.log('static path: ' + staticPath);
app.use(express.static(staticPath));
app.get('*', function(req, res) {
    var staticPath = path.join(__dirname, '/app/index.html');
    res.sendFile(staticPath); // load our public/index.html file
});

// flashcards
// routes
var routesPath = path.join(__dirname, './routes/flashcards.js');
console.log('routes path: ' + routesPath);
require(routesPath)(app);
console.log('s 11');
var env = process.env || {};

var port = env.PORT || 3003;

app.listen(port);

console.log('listening on ' + port + '...');
