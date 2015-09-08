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

  console.log('[API] [query]', q, fq);

  return request(url)
    .then(JSON.parse)
    .then(function (data) {
      return data.response.docs;
    })
    .catch(handleError);
}

function count(q) {
  var url = createUrl({
    'q': q,
    'rows': 0
  });

  console.log('[API] [count]', q, fq);

  return request(url)
    .then(JSON.parse)
    .then(function (data) {
      return data.response.numFound;
    })
    .catch(handleError);
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
      return result + value.reduce(function (r, v) {
        if (r) r += '\n';
        return r + key + ':' + v;
      }, '');
    } else {
      return result + key + ':' + value;
    }
  }, '');
}

function handleError (err) {
  console.error('[API] [error]', err.name, err.statusCode, err.message);
}

module.exports = {
  query: query,
  relations: relations,
  ways: ways,
  nodes: nodes,
  handleError: handleError
};
