// Dependencies
var express = require('express')
  , app = express()
  , logger = require('morgan')
  ;

// Logger
app.use(logger('[:date] :remote-addr :method :url :status :response-time ms - :res[content-length]'));

// Routes
app.use('/api/1.0/', require('./api/src'));
app.use(express.static('./website/public'));

// Listen
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Pi Me A River listening at http://%s:%s', host, port);
});