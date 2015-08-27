// Config
var paths =
      { geojson: process.cwd() + '/geojson/'
      , json: process.cwd() + '/json/'
      }
  ;

// Dependencies
var fs = require('fs')
  , util = require('util')
  , path = require('path')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
  , _ = require('lodash')
  , async = require('async')
  ;

// Variables
var isGeojsonFile
  , isJsonFile
  , fileIndex = 0
  , fileCount = 0
  , prevTime = Date.now()
  ;

isGeojsonFile = function (filename) {
  return filename.indexOf('.geojson') !== -1;
};

isJsonFile = function (filename) {
  return filename.indexOf('.json') !== -1;
};

async.waterfall(
  [ _.partial(fs.readdir, paths.geojson)
  , function (files, next) {
      files = _.filter(files, isGeojsonFile);

      fileCount = _.size(files);

      async.eachLimit(files, 10, processFile, next);
    }
  , _.partial(fs.readdir, paths.json)
  , function (files, next) {
      files = _.filter(files, isJsonFile);

      async.each(files, function (file, done) {
        fs.appendFile(paths.json + file, ']', done);
      }, next);
    }
  ]
, function (err) {
    err && console.error(err);
    console.log('Done');
  }
);

function processFile (filename, next) {
  var region = filename.replace('.geojson', '')
    , geojsonPath = path.join(paths.geojson, filename)
    , jsonPath = path.join(paths.json, region + '.json')
    , reader
    , parser
    , accumulator
    , nodes = []
    , sep = ''
    ;

  reader = fs.createReadStream(geojsonPath);
  writer = fs.createWriteStream(jsonPath);

  parser = JSONStream.parse('elements.*');

  accumulator = es.mapSync(function (data) {
    var json = {}
      , result
      ;

    if (data.type === 'relation') {
      json = {
        type: data.type,
        id: data.id,
        ways: _.map(data.members, 'ref'),
        name: (data.tags) ? data.tags.name : '',
        name_en: (data.tags) ? data.tags['name:en'] : ''
      };
    } else if (data.type === 'way') {
      json = {
        type: data.type,
        id: data.id,
        nodes: data.nodes,
        name: (data.tags) ? data.tags.name : '',
        name_en: (data.tags) ? data.tags['name:en'] : ''
      };
    } else if (data.type === 'node') {
      json = data;
    }

    result = sep + JSON.stringify(json) + '\n';

    if (!sep) {
      sep = ',';
    }

    return result;
  });

  writer.write('[\n');

  reader
    .pipe(parser)
    .pipe(accumulator)
    .pipe(writer)
    .on('finish', function () {
      var now = Date.now()
        , diff = now - prevTime
        ;

      prevTime = now;

      console.log(
        'Processed', ++fileIndex,
        'of', fileCount,
        'in', (diff/60).toFixed(2), 'seconds'
      );

      next();
    });
}
