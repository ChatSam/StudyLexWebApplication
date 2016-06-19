var express = require('express');
var router = express.Router();
// var OAuth = require('oauth');
var http = require('http');

var questions = [];

/*
 * GET blogposts.
 */
router.get('/posts', function(req, res, next) {
	// var db = req.db;
	// var collection = db.get('blog');
	// collection.find({},{},function(e,docs) {
		res.json(questions);
	// });
});

/*
 * POST to addblogpost
 */
router.post('/addpost', function(req, res, next) {
	// var db = req.db;
	// var collection = db.get('blog');
	console.log(req.body);
	questions.push(req.body);
	res.send({msg: ''});
	// collection.insert(req.body, function(err, result) {
	// 	res.send(
	// 		(err === null) ? {msg: ''} : {msg: err}
	// 	);
	// });
});

/*
 * DELETE to deletepost

 https://quizlet.com/authorize?response_type=code&client_id=MY_CLIENT_ID&scope=read&state=RANDOM_STRING
 */
 router.delete('/deletepost/:id', function(req,res,next) {
	 console.log("help me please!!!!!!!!!!!!!!");
	 JSONP('https://api.quizlet.com/2.0/sets/andrewvandeusen?client_id=JKtjQrzzfz&scope=read&whitespace=1', function(json) {
         console.log(json);
     });
	/*
 	var db = req.db;
 	var collection = db.get('blog');
 	var postToDelete = req.params.id;
 	collection.remove({'_id' : postToDelete}, function(err) {
 		res.send((err === null) ? {msg:''} : {msg:'error: ' + err});
 	});
	 */
 });

module.exports = router;
