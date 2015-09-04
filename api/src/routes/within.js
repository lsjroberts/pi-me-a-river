// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Routes
router.get('/', within);

// Views
function within (req, res) {
  res.send({
    message: 'within'
  });
}

// Exports
module.exports = router;