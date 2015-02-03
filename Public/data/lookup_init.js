
'use strict';

var _ = require('underscore');
var lookup = require('./countries');

module.exports = {
    getAll: function () {
        return _.sortBy(lookup, function (c) {
            return c.name;
        });
    },
    get: function (id) {
        id = +id;
        return _.find(lookup, function (p) {
            return p.id === id;
        });
    }
};
