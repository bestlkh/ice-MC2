var App = angular.module('Admin',['ngRoute','ngStorage','socket.io','Controllers', 'ngMaterial'])
    .run(["$rootScope", function ($rootScope){
        //$rootScope.baseUrl = 'http://142.1.93.22:8080'; //Application URL
    }]);
App.config(function ($routeProvider, $locationProvider){
    //$socketProvider.setConnectionUrl('http://142.1.93.22:8080'); // Socket URL
    $routeProvider	// AngularJS Routes
        .when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller: 'dashboardController'
        })
        .when('/chat', {
            templateUrl: 'chat.html',
            controller: 'chatController'
        })
        .when('/chatSettings', {
            templateUrl: 'chatSettings.html',
            controller: 'chatSettingsController'
        })
        .when('/students', {
            templateUrl: 'students.html',
            controller: 'studentsController'
        })
        .otherwise({
            redirectTo: '/dashboard',	// Default Route
            templateUrl: 'dashboard.html',
            controller: 'dashboardController'
        });

    $locationProvider.html5Mode(true);
}).component("logoutMenu", {
    template: "<div class='user-display' ng-mouseenter='$ctrl.onEnter()' ng-mouseleave='$ctrl.onLeave()'>" +
                "{{ $ctrl.user.username }}" +
                "<ul class='dd-menu' ng-if='!$ctrl.hideLogout'>" +
                    "<li>" +
                        "<a href='/logout'>Logout</a>" +
                    "</li>" +
                "</ul> " +
            "</div>",
    controller: function($scope) {
        this.hideLogout = true;
        this.interval = null;

        this.onEnter = function () {

            this.hideLogout = false;
            clearTimeout(this.interval);
        };

        this.onLeave = function () {

            clearTimeout(this.interval);
            this.interval = setTimeout(function () {

                this.hideLogout = true;
                $scope.$apply();

            }.bind(this), 1500);
        }
    },
    bindings: {
        user: '='
    }
});