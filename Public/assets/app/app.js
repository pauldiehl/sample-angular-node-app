(function () {
	"use strict";
	var app = angular.module("app", ["data", "ngRoute"]);

	app.config(function ($routeProvider) {
		$routeProvider.when("/items", {
			controller: "ListCtrl",
			templateUrl: "/assets/templates/list.html",
			resolve: {
				items: function (Items) {
					return Items.query();
				}
			}
		});
		$routeProvider.when("/item/:id", {
			controller: "EditorCtrl",
			templateUrl: "/assets/templates/editor.html",
			resolve: {
				selectedItem: function (Items, $route) {
					return Items.get({ id: $route.current.params.id });
				},
				lookup: function (Lookup) {
					return Lookup.query();
				}
			}
		});
		$routeProvider.otherwise({
			redirectTo: "/"
		});
	});


	app.controller("ListCtrl", ["$scope", "$location", "items",
		function ($scope, $location, items) {
			$scope.movies = items;

			$scope.select = function (item) {
				$location.path("/item/" + item.id);
			};
		}
	]);

	app.controller("EditorCtrl", ["$scope", "$location", "selectedItem", "lookup",
		function ($scope, $location, selectedItem, lookup) {
			$scope.errorMessage = null;
			$scope.selectedItem = selectedItem;
			$scope.thisYear = new Date().getFullYear();

			$scope.countries = lookup;

			$scope.save = function () {
				$scope.selectedItem.$save().then(function () {
					$location.path("/items");
				}, function (e) {
					$scope.errorMessage = e.data.error;
				});
			};

			$scope.cancel = function () {
				$location.path("/items");
			};
		}
	]);
}());
