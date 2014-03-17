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
    // filename: 'storage/database/rivers.table',
    filename: '/var/www/pimeariver.com/storage/database/rivers.table',
    autoload: true
});

// rivers
var River = (function() {
    function River(data) {
        for (var key in data) {
            this[key] = data[key];
        }

        this.realLength *= 1.0;
        this.crowLength *= 1.0;
        this.sinuosity  *= 1.0;
    }

    River.prototype.getCrowLength = function() {
        return haversine(this.source, this.mouth);
    };

    return River;
})();

var RiverCreate = function(data) {
    river = new River;

    river.name = data.name;

    river.realLength = data.real_length * 1.0;

    river.countries = data.countries;

    river.source = {
        latitude: data.source_lat * 1.0,
        longitude: data.source_lng * 1.0
    };
    river.mouth = {
        latitude: data.mouth_lat * 1.0,
        longitude: data.mouth_lng * 1.0
    };

    if (data.crow_length) {
        river.crowLength = data.crow_length * 1.0;
    } else {
        river.crowLength = haversine(river.source, river.mouth);
    }

    river.sinuosity = river.realLength / river.crowLength;

    return river;
}

// static assets
app.use('/styles', express.static(__dirname + '/build/styles'));
app.use('/scripts', express.static(__dirname + '/build/scripts'));

//chartColors = ['76BFCA', '7FBBC4', '87B6BD', '90B2B7', '99AEB1', 'A1A9AB',
//    'AAA5A4', 'B2A09E', 'BB9C98', 'C49892', 'CC938B', 'D58F85'];
// chartColors = ['76BFCA', '87B6BD', '99AEB1', 'AAA5A4', 'BB9C98', 'CC938B', 'D58F85'];
// chartColorStep = Math.PI / (chartColors.length * 1.0);

// index
app.get('/', function(req, res) {
    db.rivers.find({}).sort({ realLength: -1 }).exec(function(e, rivers) {
        totals = {
            realLength: 0,
            crowLength: 0,
            sinuosity: 0
        }
        minSinuosity = 999;
        maxSinuosity = 0;
        minLength = 999999;
        maxLength = 0;

        scatterChartData = [{
            key: 'Rivers',
            values: []
        }];

        barChartData = {}
        for (var b=0.0; b<6.3; b+=0.1) {
            barChartData[b.toFixed(1)] = 0;
        }

        for (var i=0; i<rivers.length; i++) {
            rivers[i] = new River(rivers[i]);

            totals.realLength += rivers[i].realLength;
            totals.crowLength += rivers[i].crowLength;
            totals.sinuosity  += rivers[i].sinuosity;

            if (rivers[i].sinuosity < minSinuosity) {
                minSinuosity = rivers[i].sinuosity;
            }

            if (rivers[i].sinuosity > maxSinuosity) {
                maxSinuosity = rivers[i].sinuosity;
            }

            if (rivers[i].realLength < minLength) {
                minLength = rivers[i].realLength;
            }

            if (rivers[i].realLength > maxLength) {
                maxLength = rivers[i].realLength;
            }

            scatterChartData[0].values.push({
                x: rivers[i].realLength,
                y: rivers[i].sinuosity
            })

            barChartData[rivers[i].sinuosity.toFixed(1)]++;
        }

        averageSinuosity = totals.sinuosity / rivers.length;
        averageLength = totals.realLength / rivers.length;

        barChartDataValues = [];
        for (var key in barChartData) {
            barChartDataValues.push({
                label: key,
                value: barChartData[key]
            });
        }

        barChartData = [{
            key: 'Rivers',
            values: barChartDataValues
        }];

        console.log({averageSinuosity: averageSinuosity,
            minSinuosity: minSinuosity,
            maxSinuosity: maxSinuosity,
            averageLength: averageLength,
            minLength: minLength,
            maxLength: maxLength});

        res.render('index.jade', {
            rivers: rivers,
            averageSinuosity: averageSinuosity,
            minSinuosity: minSinuosity,
            maxSinuosity: maxSinuosity,
            averageLength: averageLength,
            minLength: minLength,
            maxLength: maxLength,
            scatterChartData: JSON.stringify(scatterChartData),
            barChartData: JSON.stringify(barChartData)
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
    db.rivers.findOne({
        _id: req.params.id
    }, function(e, river) {
        if (null == river) {
            res.render('error/404.jade');
            return;
        }

        res.render('river/show.jade', {
            river: river
        });
    });
});

// river.edit
app.post('/river/:id', function(req, res) {
    river = RiverCreate(req.body);

    db.rivers.update({
        _id: req.params.id
    }, river, {}, function() {
        db.rivers.findOne({
            _id: req.params.id
        }, function(e, river) {
            if (null == river) {
                res.render('error/404.jade');
                return;
            }

            res.render('river/show.jade', {
                river: river
            });
        });
    });
});

app.listen(3000);
console.log('listening on port 3000');