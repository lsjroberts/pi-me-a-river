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
  var url = createUrl({
    'q': q,
    'fq': fq
  });

  return request(url)
    .then(JSON.parse)
    .then(function (data) {
      return data.response.docs;
    });
}

function count(q) {
  var url = createUrl({
    'q': q,
    'rows': 0
  });

  return request(url)
    .then(JSON.parse)
    .then(function (data) {
      return data.response.numFound;
    });
}

function createUrl (params) {
  if (!_.has(params, 'rows')) params['rows'] = '100';
  if (!_.has(params, 'wt')) params['wt'] = 'json';

  return _.reduce(params, function (url, value, key) {
    return url + key + '=' + paramsToString(value) + '&';
  }, config.solr.url + '?').slice(0, -1);
}

function paramsToString (params) {
  if (typeof params === 'string') return params;

  return _.reduce(params, function (result, value, key) {
    if (result) result += '\n';
    if (value instanceof Array) {
      return result + paramsToString(value);
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
