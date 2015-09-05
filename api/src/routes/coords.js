// Dependencies
var express = require('express')
  , _ = require('lodash')
  , config = require('../config/config')
  , solr = require('../libs/solr')
  ;

// Routes
var router = express.Router();
router.get('/:id', coords);

// Views
function coords (req, res) {
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
          river.page = req.query.page;
          river.coords = _(docs)
            .map(function (doc) {
              doc.id = parseInt(doc.id, 10);
              return doc;
            })
            .sortBy(function (doc) {
              return _.findIndex(river.ways, function (way) {
                return way === doc.id;
              });
            })
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
      var start = (req.query.page - 1) * config.solr.coordsPerPage
        , end = start + config.solr.coordsPerPage
        , paginated = river.coords.slice(start, end)
        ;

      return solr.nodes({ 'id': paginated })
        .then(function (docs) {
          river.coords = _(docs)
            .map(function (doc) {
              doc.id = parseInt(doc.id, 10);
              return doc;
            })
            .sortBy(function (doc) {
              return _.findIndex(paginated, function (coord) {
                return coord === doc.id;
              });
            })
            .map(function (doc) {
              return {
                'lat': doc.lat[0],
                'lon': doc.lon[0]
              };
            });

          return river;
        });
    })
    .then(function (river) {
      delete river.ways;
      return river;
    })
    .then(function (river) {
      return res.send(river);
    })
    .catch(console.error);
}

module.exports = router;
