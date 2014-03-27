var express = require('express');
var app = express();
var haversine = require('haversine');
var expressValidator = require('express-validator');

var Datastore = require('nedb');
var Stats = require('fast-stats').Stats;

// config
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

app.use(express.json());
app.use(express.urlencoded());
app.use(expressValidator());
app.use(express.cookieParser());
app.use(express.session({secret: 'put-some-config-file-secret-here'}));
app.engine('jade', require('jade').__express)


// datastore
var db = {};
db.rivers = new Datastore({
    filename: 'storage/database/rivers.table',
    // filename: '/var/www/pimeariver.com/storage/database/rivers.table',
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

    river.comments = data.comments;

    return river;
}

// add custom validation rules
expressValidator.validator.extend('riverExists', function(str, rivers) {
    for (i in rivers) {
        if (rivers[i].name == str) {
            return false;
        }
    }
    return true;
});

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
        for (var b=0.0; b<9.6; b+=0.1) {
            barChartData[b.toFixed(1)] = 0;
        }

        var statsSinuosity = new Stats(),
            statsRealLength = new Stats(),
            statsCrowLength = new Stats();

        for (var i=0; i<rivers.length; i++) {
            rivers[i] = new River(rivers[i]);

            statsSinuosity.push(rivers[i].sinuosity);
            statsRealLength.push(rivers[i].realLength);
            statsCrowLength.push(rivers[i].crowLength);

            scatterChartData[0].values.push({
                x: rivers[i].realLength,
                y: rivers[i].sinuosity
            })

            barChartData[rivers[i].sinuosity.toFixed(1)]++;
        }

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

        riverCreateErrors = req.session.riverCreateErrors;
        riverCreateData   = req.session.riverCreateData;

        req.session.riverCreateErrors = null;
        req.session.riverCreateData   = null;

        res.render('index.jade', {
            rivers: rivers,
            riverCreateErrors: riverCreateErrors,
            riverCreateData: riverCreateData,
            statsSinuosity: statsSinuosity,
            statsRealLength: statsRealLength,
            statsCrowLength: statsCrowLength,
            scatterChartData: JSON.stringify(scatterChartData),
            barChartData: JSON.stringify(barChartData)
        });
    });
});

// river.store
app.post('/river', function(req, res) {
    db.rivers.find({}, function(e, rivers) {
        req.body.name = expressValidator.validator.trim(req.body.name);
        req.body.countries = expressValidator.validator.trim(req.body.countries);

        req.assert('name', 'River already exists').riverExists(rivers);
        req.assert('name', 'River name is required').notEmpty()

        req.assert('countries', 'Country / countries is required').notEmpty();

        req.assert('real_length', 'Length must be a number').isNumeric();
        req.assert('real_length', 'Length is required').notEmpty();

        req.assert('source_lat', 'Source latitude must be a decimal').isFloat();
        req.assert('source_lng', 'Source longitude must be a decimal').isFloat();
        req.assert('mouth_lat', 'Mouth latitude must be a decimal').isFloat();
        req.assert('mouth_lng', 'Mouth longitude must be a decimal').isFloat();

        var errors = req.validationErrors(true);
        if (! errors) {
            river = RiverCreate(req.body);
            db.rivers.insert(river);
        }
        else {
            req.session.riverCreateErrors = errors;
            req.session.riverCreateData   = req.body;
        }

        res.redirect('/');
    });
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

        riverUpdateErrors = req.session.riverUpdateErrors;
        riverUpdateData   = req.session.riverUpdateData;

        req.session.riverUpdateErrors = null;
        req.session.riverUpdateData   = null;

        res.render('river/show.jade', {
            river: river,
            riverUpdateErrors: riverUpdateErrors,
            riverUpdateData: riverUpdateData
        });
    });
});

// river.edit
app.post('/river/:id', function(req, res) {
    req.body.name = expressValidator.validator.trim(req.body.name);
    req.body.countries = expressValidator.validator.trim(req.body.countries);

    req.assert('name', 'River name is required').notEmpty()

    req.assert('countries', 'Country / countries is required').notEmpty();

    req.assert('real_length', 'Length must be a number').isNumeric();
    req.assert('real_length', 'Length is required').notEmpty();

    req.assert('source_lat', 'Source latitude must be a decimal').isFloat();
    req.assert('source_lng', 'Source longitude must be a decimal').isFloat();
    req.assert('mouth_lat', 'Mouth latitude must be a decimal').isFloat();
    req.assert('mouth_lng', 'Mouth longitude must be a decimal').isFloat();

    var errors = req.validationErrors(true);
    if (! errors) {
        river = RiverCreate(req.body);

        db.rivers.update({
            _id: req.params.id
        }, river, {}, function() {
            res.redirect('/river/'+req.params.id);
        });
    }
    else {
        req.session.riverUpdateErrors = errors;
        req.session.riverUpdateData   = req.body;
    }

    res.redirect('/river/'+req.params.id);
});

// river.delete
app.post('/river/:id/delete', function(req, res) {
    db.rivers.remove({
        _id: req.params.id
    }, {}, function(e, numRemoved) {
        res.redirect('/');
    });
});

app.get('/task/error-check', function(req, res) {
    db.rivers.find({}, function(e, rivers) {
        broken = [];

        for (var i=0; i<rivers.length; i++) {
            river = new River(rivers[i]);

            if (river.source.latitude == 0 ||
                river.source.longitude == 0 ||
                river.mouth.latitude == 0 ||
                river.mouth.longitude == 0
            ) {
                broken.push({
                    river: river,
                    error: 'lnglat'
                });
            }

            if (typeof river.realLength != "number" ||
                river.realLength < 0
            ) {
                broken.push({
                    river: river,
                    error: 'realLength'
                });
            }

            if (typeof river.crowLength != "number" ||
                river.crowLength < 0
            ) {
                broken.push({
                    river: river,
                    error: 'crowLength'
                });
            }
        }

        res.render('task/error-check', {
            broken: broken
        })
    });
});

app.listen(3000);
console.log('listening on port 3000');