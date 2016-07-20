(function (angular) {
    'use strict';

    var app = angular.module('adphorusWork', ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        .state('/', {
            url: '/',
            templateUrl: 'welcome.html'
        })
        .state('/search-movie', {
                url: '/search-movie',
                templateUrl: 'search-movie.html',
                controller: 'searchMovieController'
        })
        .state('/result-movie', {
               url: '/result-movie',
               templateUrl: 'result-movie.html',
               controller: 'resultMovieController'
        });
        $urlRouterProvider.otherwise('/search-movie');
    });

    app.controller('searchMovieController', function ($scope, $http, resultFactory) {
        $scope.searchMovieF = function (val) {
            if (typeof val !== 'undefined') {
            if (val.length > 0) {
                $scope.api = 'http://www.omdbapi.com/?t=' + $scope.searchMovie + '&y=&plot=short&r=json';
                $http.get($scope.api).success(function (data) {
                           resultFactory.set({
                           name:data.Title || '',
                           release: data.Released || '',
                           length: data.Runtime || '',
                           description: data.Plot || '',
                           rating: data.imdbRating || ''
                           })
                       if (data.Error == "Movie not found!") {
                           alert("Movie not found !");
                       }
                });
            } 
          }
        }
    });
    app.controller('resultMovieController', function ($scope, resultFactory, $state) {
        $scope.result = resultFactory.details;
    });
    //That is all the factory  we just need to return details and set
    app.factory('resultFactory', function ($http) {
        var details = {};
        var set = function (obj) {
            var objKeys = Object.keys(obj)
            for (var i = 0; i < objKeys.length; i++) {
                details[objKeys[i]] = obj[objKeys[i]];
            }
        }
        return {
            details: details,
            set: set
        }
    });
})(angular);

