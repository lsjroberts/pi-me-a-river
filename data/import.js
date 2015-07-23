var
  // Config
  path = process.cwd() + '/../raw/natural-earth-data/ne_10m_rivers_lake_centerlines.shp',

  // Dependencies
  shapefile = require('shapefile'),

  // Variables
  reader = shapefile.reader(path),
  rivers = {};

reader.readHeader(function(err, header) {
  if (err) throw err;

  console.log('header', header);

  readNextRecord();
});

function readNextRecord() {
  reader.readRecord(function(err, record) {
    if (err) throw err;

    if (record === shapefile.end) {
      console.log(rivers);
      console.log(Object.keys(rivers).length);
      return reader.close();
    }

    // console.log('record', record);

    var feature = transformRecord(record);

    if (rivers[record.properties.rivernum]) {
      rivers[record.properties.rivernum].push(feature);
    } else {
      rivers[record.properties.rivernum] = [feature];
    }

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