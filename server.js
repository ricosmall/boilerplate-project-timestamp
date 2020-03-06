// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// timstamp
app.get("/api/timestamp/:date_string?", function (req, res) {
  var date_string = req.params.date_string
  var isTimestamp = /^\d+$/.test(date_string)
  var date
  if (!date_string) {
    date = new Date()
  } else if (isTimestamp) {
    date = new Date(Number(date_string))
  } else {
    date = new Date(date_string)
  }
  var unix = date.getTime()
  if (isNaN(unix)) return res.json({ error: 'invalid date' })
  var utc = date.toUTCString()
  var data = { unix: unix, utc: utc }
  res.json(data)
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});