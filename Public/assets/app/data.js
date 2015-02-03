(function () {
    "use strict";
    var app = angular.module("data", ["ngResource"]);

    app.factory("Items", ['$resource',
      function ($resource) {
          return $resource("/api/items/:id", { id: '@id' }, {
              save: {
                  method: "PUT"
              }
          });
      }]);

    app.factory("Lookup", ['$resource',
      function ($resource) {
          return $resource("/api/lookup");
      }]);

}());

