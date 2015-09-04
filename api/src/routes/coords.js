// console.log(river.coords.length);
// river.coords = _.slice(river.coords, 0, 200);
// console.log(river.coords.length);
// return solr.nodes({ 'id': river.coords })
//   .then(function (docs) {
//     console.log(docs.length);
//     river.coords = _.map(docs, function (doc) {
//       return {
//         'lat': doc.lat[0],
//         'lon': doc.lon[0]
//       };
//     })
//     return river;
//   });