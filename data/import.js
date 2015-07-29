var
  // Config
  paths = {
    shapefile: process.cwd() + '/../raw/natural-earth-data/ne_10m_rivers_lake_centerlines.shp',
    db: process.cwd() + '/storage/db.sqlite'
  },

  // Dependencies
  shapefile = require('shapefile'),
  sqlite3 = require('sqlite3'),

  // Variables
  db = new sqlite3.Database(paths.db);


importShapefile(path);


function importShapefile(path) {
  var reader = shapefile.reader(path)

  reader.readHeader(function(err, header) {
    if (err) throw err;
    readNextRecord(reader);
  });
}

function readNextRecord(reader) {
  reader.readRecord(function(err, record) {
    if (err) throw err;

    if (record === shapefile.end) {
      return reader.close();
    }

    createFeature(transformRecord(record));

    setImmediate(readNextRecord);
  });
}

function transformRecord(record) {
  return {
    name: record.properties.name,
    type: record.properties.featurecla,
    scalerank: record.properties.scalerank
  };
}

function createFeature(feature) {

}