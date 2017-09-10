var App = angular.module('Landing',['ngRoute', 'Controllers'])
    .run(["$rootScope", function ($rootScope){
        //$rootScope.baseUrl = 'http://142.1.93.22:8080'; //Application URL
    }]);
App.config(function ($routeProvider, $locationProvider){
    //$socketProvider.setConnectionUrl('http://142.1.93.22:8080'); // Socket URL

    $routeProvider	// AngularJS Routes
        .when('/', {
            templateUrl: 'landing.html',
            controller: 'landingController'
        })
        .otherwise({
            redirectTo: '/landing',	// Default Route
            templateUrl: 'landing.html',
            controller: 'landingController'
        });

        $locationProvider.html5Mode(true);
});
