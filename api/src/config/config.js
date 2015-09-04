var env = process.ENV || 'local';

var config = require('./' + env + '.json');

module.exports = config;