module.exports = function() {

    var http = require('http');

    return {
        test: test
    };

    function test(req, res) {
        res.send("some information");
    }
}

