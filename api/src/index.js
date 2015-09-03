// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Middlewares
router.use(require('./middleware/auth'));

// Routes
// app.use('/', require('./routes/index'));
// app.use('/search', require('./routes/search'));
// app.use('/near', require('./routes/near'));
// app.use('/within', require('./routes/within'));
// app.use('/rivers', require('./routes/rivers'));

// Exports
module.exports = router;
