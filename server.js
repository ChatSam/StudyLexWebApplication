var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    path = require('path'),
    app = express();

mongoose.connect('mongodb://localhost:27017/flashCardDB');

app.use(bodyParser.json());

var cardRoutes = require('./routes/flashcards');
// Import my cards routes into the path '/flashcards'
app.use('/flashcards', cardRoutes);

var staticPath = path.join(__dirname, '/app');
console.log('static path: ' + staticPath);
app.use(express.static(staticPath));

app.get('*', function(req, res) {
    var staticPath = path.join(__dirname, '/app/index.html');
    res.sendFile(staticPath);
});

var env = process.env || {};

var port = env.PORT || 3003;

app.listen(port);

console.log('listening on ' + port + '...');
