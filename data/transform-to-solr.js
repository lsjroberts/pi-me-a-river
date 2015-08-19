// Config
var paths =
      { json: process.cwd() + '/../raw/open-street-map/river/'
      , transformed: process.cwd() + '/transformed/'
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
// var

async.waterfall(
  [ _.partial(fs.readdir, paths.json)
  , function (files, next) {
      files = _.filter(files, function (filename) {
        return filename.indexOf('.json') !== -1;
      });

      async.eachLimit(files, 10, processFile, next);
    }
  , _.partial(fs.readdir, paths.transformed)
  , function (files, next) {
      files = _.filter(files, function (filename) {
        return filename.indexOf('.json') !== -1;
      });

      async.each(files, function (file, done) {
        fs.appendFile(paths.transformed + file, ']', done);
      }, next);
    }
  ]
, function (err) {
    err && console.error(err);
    console.log('Done');
  }
);

function processFile (filename, next) {
  // filename = 's_-10_w_-150_n_0_e_-120.json';
  var region = filename.replace('.json', '')
    , filePath = path.join(paths.json, filename)
    , transformedPath = path.join(paths.transformed, filename)
    , reader
    , parser
    , accumulator
    , nodes = []
    , sep = ''
    ;

  reader = fs.createReadStream(filePath);
  writer = fs.createWriteStream(transformedPath);

  parser = JSONStream.parse('elements.*');

  accumulator = es.mapSync(function (data) {
    var transformed = {}
      , result
      ;

    if (data.type === 'relation') {
      transformed = {
        type: data.type,
        id: data.id,
        ways: _.map(data.members, 'ref'),
        name: (data.tags) ? data.tags.name : '',
        name_en: (data.tags) ? data.tags['name:en'] : ''
      };
    } else if (data.type === 'way') {
      transformed = {
        type: data.type,
        id: data.id,
        nodes: data.nodes,
        name: (data.tags) ? data.tags.name : '',
        name_en: (data.tags) ? data.tags['name:en'] : ''
      };
    } else if (data.type === 'node') {
      transformed = data;
    }

    result = sep + JSON.stringify(transformed) + '\n';

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
      next();
    });
}
