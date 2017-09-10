var App = angular.module('Register',['ngRoute', 'Controllers'])
    .run(["$rootScope", function ($rootScope){
        //$rootScope.baseUrl = 'http://142.1.93.22:8080'; //Application URL
    }]);
App.config(function ($routeProvider, $locationProvider){
    //$socketProvider.setConnectionUrl('http://142.1.93.22:8080'); // Socket URL
    $routeProvider	// AngularJS Routes
        .when('/:code', {
            templateUrl: 'register.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/',	// Default Route
            templateUrl: 'register.html',
            controller: 'registerController'
        });

    $locationProvider.html5Mode(true);
});
