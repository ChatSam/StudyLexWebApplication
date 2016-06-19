var express = require('express');
var router = express.Router();

var credentials = {
  clientID: 'JKtjQrzzfz',
  clientSecret: 'Zh39YmAGXSsNjJp4V3mfhR',
  site: 'https://api.quizlet.com/oauth/token'
};

var oauth2 = require('simple-oauth2')({
  clientID: credentials.clientID,
  clientSecret: credentials.clientSecret,
  site: credentials.site,
  tokenPath: '/authorize'
});

// Authorization uri definition
var authorization_uri = oauth2.authCode.authorizeURL({
  redirect_uri: 'http://localhost:3100/callback',
  scope: 'notifications',
  state: '3(#0/!~'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('/public/index.html');
});

// Initial page redirecting to Github
router.get('/auth', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callback', function (req, res) {
  var code = req.query.code;
  console.log('/callback');
  oauth2.authCode.getToken({
    code: code,
    redirect_uri: 'http://localhost:3100/callback'
  }, saveToken);

  function saveToken(error, result) {
    if (error) { console.log('Access Token Error', error.message); }
    token = oauth2.accessToken.create(result);
  }
});

router.get('/start', function (req, res) {
  res.send('Hello<br><a href="/auth">Log in with Github</a>');
});


module.exports = router;
