// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Routes
router.get('/', near);

// Views
function near (req, res) {
  res.send({
    message: 'near'
  });
}

// Exports
module.exports = router;