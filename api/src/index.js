// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Middlewares
// router.use(require('./middleware/auth'));

// Routes
router.use('/', require('./routes/index'));
router.use('/search', require('./routes/search'));
router.use('/near', require('./routes/near'));
router.use('/within', require('./routes/within'));
router.use('/rivers', require('./routes/rivers'));

// Exports
module.exports = router;
