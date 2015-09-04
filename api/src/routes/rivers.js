// Dependencies
var express = require('express')
  , _ = require('lodash')
  , config = require('../config/config')
  , solr = require('../libs/solr')
  ;

// Routes
var router = express.Router();
router.get('/:id', river);

// Views
function river (req, res) {
  solr.relations({ "id": req.params.id })
    .then(function (docs) {
      return _(docs)
        .map(function (doc) {
          return {
            'id': doc.id,
            'name': doc.name[0],
            'name_en': doc.name_en ? doc.name_en[0] : doc.name[0],
            'ways': doc.ways
          };
        })
        .first();
    })
    .then(function (river) {
      return solr.ways({ 'id': river.ways })
        .then(function (docs) {
          river.coords = _(docs)
            .map(function (doc) {
              return doc.nodes;
            })
            .flatten()
            .unique()
            .value();
          return river;
        });
    })
    .then(function (river) {
      var ends = [river.coords[0], river.coords[river.coords.length-1]];
      return solr.nodes({ 'id': ends })
        .then(function (docs) {
          docs = _.map(docs, function (doc) {
            return {
              'lat': doc.lat[0],
              'lon': doc.lon[0]
            };
          });

          river.source = docs[0];
          river.mouth = docs[1];

          return river;
        });
    })
    .then(function (river) {
      var pages = Math.ceil(river.coords.length / 100);
      river.coords = _.times(pages, function (page) {
        return [
          config.url,
          '/coords/',
          river.id,
          '?page=',
          page + 1
        ].join('');
      });
      return river;
    })
    .then(function (river) {
      delete river.ways;
      return river;
    })
    .then(function (data) {
      return res.send(data);
    })
    .catch(console.error);
}

// Exports
module.exports = router;