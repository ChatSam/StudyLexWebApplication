var express = require('express'),
    path = require('path'),
    app = express();

var staticPath = path.join(__dirname);
console.log('static path: ' + staticPath);
app.use(express.static(staticPath));

var routesPath = path.join(__dirname, './express/routes.js');
console.log('routes path: ' + routesPath);
require(routesPath)(app, staticPath);

var env = process.env || {};

var port = env.PORT || 3003;

app.listen(port);

console.log('listening on ' + port + '...');
