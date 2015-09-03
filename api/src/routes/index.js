// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Routes
router.get('/', viewIndex);

// Views
function viewIndex (req, res) {
  res.send({
    message: 'boo!'
  });
}

// Exports
module.exports = router;