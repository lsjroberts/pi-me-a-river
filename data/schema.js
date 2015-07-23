var
  // Config
  paths = {
    db: process.cwd() + '/storage/db.sqlite',
    schema: process.cwd() + '/schema.sql'
  },

  // Dependencies
  sqlite3 = require('sqlite3').verbose(),
  fs = require('fs'),

  // Variables
  db = new sqlite3.Database(paths.db);


fs.readFile(paths.schema, function(err, schema) {
  if (err) throw err;

  createSchema(schema.toString());
});

function createSchema(sql) {
  db.serialize(function() {
    db.run(sql);
  });
}