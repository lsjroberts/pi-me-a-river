var express = require('express');
var app = express();
var datastore = require('nedb');
var haversine = require('haversine');

// config
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.use(express.json());
app.use(express.urlencoded());

app.engine('jade', require('jade').__express)

// datastore
var db = {};
db.rivers = new datastore({
    filename: 'storage/database/rivers.table',
    autoload: true
});

// rivers
var River = (function() {
    function River(data) {
        for (var key in data) {
            this[key] = data[key];
        }
    }

    River.prototype.getCrowLength = function() {
        return haversine(this.source, this.mouth);
    };

    return River;
})();

var RiverCreate = function(data) {
    river = new River;

    river.name = data.name;

    river.realLength = data.real_length;

    river.source = {
        latitude: data.source_lat,
        longitude: data.source_lng
    };
    river.mouth = {
        latitude: data.mouth_lat,
        longitude: data.mouth_lng
    };

    if (data.crow_length) {
        river.crowLength = data.crow_length;
    } else {
        river.crowLength = haversine(river.source, river.mouth);
    }

    river.sinuosity = river.realLength / river.crowLength;

    return river;
}

// static assets
app.use('/styles', express.static(__dirname + '/build/styles'));
app.use('/scripts', express.static(__dirname + '/build/scripts'));

// index
app.get('/', function(req, res) {
    db.rivers.find({}, function(e, rivers) {
        totals = {
            realLength: 0,
            crowLength: 0,
            sinuosity: 0
        }

        for (var i=0; i<rivers.length; i++) {
            rivers[i] = new River(rivers[i]);

            totals.realLength += rivers[i].realLength;
            totals.crowLength += rivers[i].crowLength;
            totals.sinuosity  += rivers[i].sinuosity;
        }

        averageSinuosity = totals.sinuosity / rivers.length;

        res.render('index.jade', {
            rivers: rivers,
            averageSinuosity: averageSinuosity
        });
    });
});

// river.store
app.post('/river', function(req, res) {
    river = RiverCreate(req.body);

    db.rivers.insert(river);

    res.redirect('/');
});

// river.show
app.get('/river/:id', function(req, res) {
    river = db.rivers.find({
        _id: req.id
    });

    res.render('river/show.jade', {
        river: river
    });
});

// river.edit
app.post('/river/:id', function(req, res) {
    // data = {
    //     real_length: req.body.real_length
    // }

    // data.source_lat = req.body.source_lat;
    // data.source_lng = req.body.source_lng;
    // data.mouth_lat = req.body.mouth_lat;
    // data.mouth_lng = req.body.mouth_lng;

    // if (req.body.crow_length) {
    //     data.crow_length = req.body.crow_length;
    // } else {
    //     data.crow_length = haversine({
    //         latitude: data.source_lat,
    //         longitude: data.source_lng
    //     }, {
    //         latitude: data.mouth_lat,
    //         longitude: data.mouth_lng
    //     });
    // }

    // river = db.rivers.update({
    //     slug: slug
    // }, data);
});

app.listen(8000);
console.log('listening on port 8000');