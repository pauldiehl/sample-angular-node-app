'use strict';

var _ = require('underscore');
var items = require('./movies')
var lookup = require('./lookup_init');

function validate(item) {
    if (!item.title) {
        return { statusCode: 400, error: "A title is required!" };
    }
    if (item.title.length < 2) {
        return { statusCode: 400, error: "A title should be more that one character!" };
    }
    if (item.title.length > 80) {
        return { statusCode: 400, error: "The maximum length of a item title is 80 characters!" };
    }
    if (!item.description) {
        return { statusCode: 400, error: "A description is required!" };
    }
    if (item.year < 2000) {
        return { statusCode: 400, error: "That is older than a baby boomer" };
    }
    if (item.year > new Date().getFullYear()) {
        return { statusCode: 400, error: "Can't be in the future!" };
    }
    if (!item.countryID) {
        return { statusCode: 400, error: "A country is required!" };
    }
    if (!lookup.get(item.countryID)) {
        return { statusCode: 400, error: "The country is not found!" };
    }

    return null;
}

module.exports = {
    getAll: function () {
        return items;
    },
    get: function (id) {
        return _.find(items, function (p) {
            return p.id === +id;
        });
    },
    save: function (id, item) {
        var errors = validate(item);
        
        if (errors) {
            return errors;
        } else {
            id = +id;
            var olditem = _.find(items, function (p) {
                return p.id === id;
            });
            var index = _.indexOf(items, olditem);
            items[index] = item;
            return item;
        }
    }
};
