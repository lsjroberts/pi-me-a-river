var request = require('request-promise')
  , _ = require('lodash')
  , config = require('../config/config')
  ;

function relations (q) {
  return query(q, { 'type': 'relation' });
}

function ways (q) {
  return query(q, { 'type': 'way' });
}

function nodes(q) {
  return query(q, { 'type': 'node' });
}

function query (q, fq) {
  var url = [
    config.solr.url,
    '?q=',
    paramsToString(q),
    '&fq=',
    paramsToString(fq),
    '&rows=500',
    '&wt=json'
  ].join('');

  return request(url)
    .then(JSON.parse)
    .then(function (data) {
      return data.response.docs;
    });
}

function paramsToString (params) {
  if (typeof params === 'string') return params;

  return _.reduce(params, function (result, value, key) {
    if (result) result += '\n';
    if (value instanceof Array) {
      return result + value.reduce(function (r, v) {
        if (r) r += '\n';
        return r + key + ':' + v;
      }, '');
    } else {
      return result + key + ':' + value;
    }
  }, '');
}

module.exports = {
  query: query,
  relations: relations,
  ways: ways,
  nodes: nodes
};