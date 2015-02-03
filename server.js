'use strict';

var express = require('express');
var app = express();
var items = require('./public/data/items_init');
var lookup = require('./public/data/lookup_init');
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/items', function (req, res) {
    res.send(items.getAll());
});

app.get('/api/items/:id', function (req, res) {
    res.send(items.get(req.params.id));
});

app.put('/api/items/:id', function (req, res) {
    var result = items.save(req.params.id, req.body);
    res.send(result, result.statusCode || 200);
});

app.get('/api/lookup', function (req, res) {
    res.send(lookup.getAll());
});

app.listen(process.env.PORT || 8080, function () {
    console.info('The server is listening at port ' + (process.env.PORT || 8080));
});
