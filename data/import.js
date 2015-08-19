// Config
var paths =
      { db: process.cwd() + '/storage/db.sqlite'
      , sql: process.cwd() + '/processed/'
      , json: process.cwd() + '/../raw/open-street-map/river/'
      }
  , statements =
      { river: 'INSERT INTO rivers(`id`, `name`, `source`, `mouth`) VALUES (%d, "%s", %d, %d);\n'
      , coord: 'INSERT INTO coordinates(`id`, `latitude`, `longitude`) VALUES(%d, %d, %d);\n'
      , riverCoord: 'INSERT INTO river_coordinates(`riverId`, `coordinateId`) VALUES (%d, %d);\n'
      }
  ;

// Dependencies
var fs = require('fs')
  , util = require('util')
  , path = require('path')
  , JSONStream = require('JSONStream')
  , es = require('event-stream')
  , _ = require('lodash')
  , sqlite3 = require('sqlite3')
  , async = require('async')
  ;

// Variables
var db = new sqlite3.Database(paths.db)
  ;

async.waterfall(
  [ _.partial(fs.readdir, paths.json)
  , function (files, next) {
      async.each(files, processFile, next);
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
    , sqlPath = path.join(paths.sql, region + '.sql')
    , reader
    , parser
    , accumulator
    , nodes = []
    ;

  reader = fs.createReadStream(filePath);
  writer = fs.createWriteStream(sqlPath);

  writer.write('-- ' + region + '\n');

  parser = JSONStream.parse('elements.*');

  accumulator = es.mapSync(function (data) {
    var lines = '';

    if (data.type === 'way') {
      lines = util.format.apply(this,
        [ statements.river
        , data.id
        , (data.tags && data.tags.name) ? data.tags.name : ""
        , data.nodes[0]
        , data.nodes[data.nodes.length-1]
        ]
      );

      lines += _.reduce(data.nodes, function (r, node) {
        return r + util.format.apply(this,
          [ statements.riverCoord
          , data.id
          , node
          ]
        );
      }, '');
    } else if (data.type === 'node') {
      lines = util.format.apply(this,
        [ statements.coord
        , data.id
        , data.lat
        , data.lon
        ]
      );
    }

    return lines;
  });

  reader
    .pipe(parser)
    .pipe(accumulator)
    .pipe(writer)
    .on('end', function () {
      next();
    });
}
