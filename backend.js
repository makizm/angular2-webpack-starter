/*
 * Node backend/proxy server
 * 
 */

/* To do:
 * - read token from local storage and check expiration
 * - renew token before exp date
 * - check if token expired then show auth screen
 * - check if token and url provided, if not GTFO
 * - auth attempt but token is locally stored but not expired
 * - proxy client REST requests to SmartApp
 * - handle errors
*/

// Set this server settings
const SRV_PORT = 3001;    // listen port

// Set Dash UI settings
const DASH_ERROR_URI = '/#/error';
const DASH_REDIRECT_URI = '/';
const DASH_SERVER = 'localhost:3000';

// Set SmartApp settings
const CLIENT_ID = '865923f9-f22a-45e2-8108-ba95e4336617';       // deprecate, provided by client
const CLIENT_SECRET = '';   // deprecate, provided by client
const SAPP_REDIRECT_URL = 'http://localhost:3001/auth/callback';
const SAPP_REST_SERVER = 'graph.api.smartthings.com';
const SAPP_BASE_URL = 'https://graph.api.smartthings.com';
const SAPP_ENDPOINTS_URL = SAPP_BASE_URL + '/api/smartapps/endpoints';

// Init express
const request = require('request');
const express = require('express'),
    app = express();

// Init express proxy
const proxy = require('express-http-proxy');

// Init https
const https = require('https');

// Init cookie partse for saving token cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Init local storage for config data
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
// localStorage.setItem('token', 'token value');
// console.log(localStorage.getItem('token'));

// Set settings for Oauth2
const creds = {
  client: {
    id: CLIENT_ID,
    secret: CLIENT_SECRET
  },
  auth: {
    tokenHost: SAPP_BASE_URL
  }
}

// Init Oauth2 for obvious reasons
const oauth2 = require('simple-oauth2').create(creds);
 
// Configure Oauth2
// Authorization uri definition 
var authorization_uri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: SAPP_REDIRECT_URL,
  scope: 'app',
  state: '3(#0/!~'
});

/* Combine url with token and encode i
  * t:string = token id
  * u:string = access url
  */
function encodeToken(t,u) {
  return Buffer.from(t + ";" + u).toString('base64');
}

var smartAppGet = function (req, res, next) {
  // check auth cookie
  let token = req.cookies.token;
  if (!token) {
    res.redirect(DASH_ERROR_URI + ';id=201');
  }

  // Decode and parse token into key and url
  let [key,url] = new Buffer(token, 'base64').toString('ascii').split(';');

  // Get url param and regex all ; with /
  let requrl = req.params.url.replace(/;/g,'/');

  // Set https options
  let options = {
    method: 'GET',
    path: url + '/' + requrl,
    host: SAPP_REST_SERVER,
    post: 443,
    rejectUnauthorized: false,
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + key
    }
  }

  // Callback function to parse response data
  callback = function(r) {
    // Check if bad status code received
    if(r.statusCode == 200 ) {
      var str = '';
      r.on('data', function (chunk) {
        str += chunk;
      });

      r.on('end', function () {
        res.send(JSON.parse(str));
      });
    } else {
      // Output error message using response code received
      res.status(r.statusCode).send({ message: r.statusMessage });
    }
  }

  // Attempt to make a rest call
  var rest = https.request(options, callback);
  
  // Check for errors
  rest.on('error', (e) => {
    res.status(500).send({ message: e });
  });

  // Close session
  rest.end();
}

// Proxy api
app.get('/api/:url', smartAppGet);
app.get('/api', function(req, res) {
  res.send({ message: 'Welcome to SmartApp API Proxy'});
});
 
// Initial page redirecting to SmartThings auth page to get code
app.get('/auth', function (req, res) {
  let existing_token = localStorage.getItem('token');
  if (existing_token) {
    let savedData = JSON.parse(existing_token);
    // Save encoded token data
    res.cookie('token', encodeToken(savedData['token'],savedData['url']),
                { maxAge: savedData['ttl'], httpOnly: false });
    // Redirect to the app
    res.redirect(DASH_REDIRECT_URI);
  } else {
    // Get new token
    res.redirect(authorization_uri);
  }
});
 
// Callback service parsing the authorization token and asking for the access token 
app.get('/auth/callback', function (req, res) {

  res.setHeader('Content-Type', 'application/json');

  var handleError = function (msg) {
    // res.status(500);
    // res.send(JSON.stringify({ message: msg }, null, 3));
    // console.log(msg);
    res.redirect(DASH_ERROR_URI + ';id=' + 100);
  }

  // Parse code value from response
  var code = req.query.code;
  
  // Get token to get a token and url
  if (code) {
    oauth2.authorizationCode.getToken({
      code: code,
      redirect_uri: SAPP_REDIRECT_URL
    }, saveToken);
  } else {
    handleError('callback got code ' + code);
  }

  // Get the actual token with url and save it in cookies
  function saveToken(error, result) {

    if (error) { 
      handleError(error.message);
    }
    
    if (!error && result) {

      let token = result.access_token;
      let token_ttl = result.expires_in;

      let sendreq = { method: "GET", uri: SAPP_ENDPOINTS_URL + "?access_token=" + result.access_token };

      request(sendreq, function (err, res1, body) {
        if (err) {
          handleError(err.message);
        }

        if (!err && body) {
          // Parse some data
          let endpoints = JSON.parse(body)[0];  // body returns multiple entries
          let access_url = endpoints.url;

          // Save token info as a browser cookie
          res.cookie( 'token', encodeToken(token, access_url), 
                      { maxAge: token_ttl, httpOnly: false } );
          // Combine url with token and encode it for saving as a cookie
          // let encoded_token = Buffer.from(token + "." + access_url).toString('base64');

          // // Save encoded token data
          // res.cookie('token', encoded_token, { maxAge: token_ttl, httpOnly: false });
          // res.cookie('url', access_url, { maxAge: token_ttl, httpOnly: false });

          let outJson = {
            token: token,
            url: access_url,
            ttl: token_ttl
          }

          // Save token info to local storage
          localStorage.setItem('token', JSON.stringify(outJson));

          // Output json for testing
          // res.send(JSON.stringify(outJson, null, 3));
          res.redirect(DASH_REDIRECT_URI);
        }
        
      });

    }
  } // saveToken
});

app.use('/', proxy(DASH_SERVER));
// To be removed
// app.get('/', function (req, res) {
  // res.send('<a href="/auth">Connect with SmartThings</a>');
// });

app.listen(SRV_PORT);

console.log('Express server started on port ' + DASH_SERVER);
