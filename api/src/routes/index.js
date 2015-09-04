// Dependencies
var express = require('express')
  , router = express.Router()
  ;

// Routes
router.get('/', viewIndex);

// Views
function viewIndex (req, res) {
  res.send({
    version: '1.0',
    documentation: 'http://docs.pimeariver.apiary.io',
    website: 'http://pimeariver.com'
  });
}

// Exports
module.exports = router;