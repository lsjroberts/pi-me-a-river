// Dependencies
var express = require('express')
  , _ = require('lodash')
  , solr = require('../libs/solr')
  ;

// Routes
var router = express.Router();
router.get('/', search);

// Views
function search (req, res) {
  solr.relations(req.query.name)
    .then(function (docs) {
      return _(docs)
        .map(function (doc) {
          return {
            "id": parseInt(doc.id, 10),
            "name": doc.name[0],
            "name_en": doc.name_en ? doc.name_en[0] : doc.name[0]
          };
        })
        .value();
    })
    .then(function (rivers) {
      return res.send(rivers);
    })
    .catch(console.error);
}

// Exports
module.exports = router;