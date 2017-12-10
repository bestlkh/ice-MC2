var App = angular.module('Admin',['ngRoute','ngStorage','socket.io','Controllers', 'ngMaterial', 'angular-spinkit'])
    .run(["$rootScope", function ($rootScope){
        //$rootScope.baseUrl = 'http://142.1.93.22:8080'; //Application URL
    }]);
App.config(function ($routeProvider, $locationProvider){
    //$socketProvider.setConnectionUrl('http://142.1.93.22:8080'); // Socket URL
    $routeProvider	// AngularJS Routes
        .when('/ta', {
            templateUrl: '/app/views/admin/ta.html',
            controller: 'taController'
        })
        .when('/chat', {
            templateUrl: '/app/views/admin/chat.html',
            controller: 'chatController'
        })
        .when('/chatSettings', {
            templateUrl: '/app/views/admin/chatSettings.html',
            controller: 'chatSettingsController'
        })
        .when("/classrooms", {
            templateUrl: '/app/views/admin/class.html',
            controller: 'classController'
        })
        .when("/classrooms/:name", {
            templateUrl: '/app/views/admin/classDetail.html',
            controller: 'classDetailController'
        })
        .when("/classrooms/:name/students", {
            templateUrl: '/app/views/admin/classStudents.html',
            controller: 'studentsController'
        })
        .otherwise({
            redirectTo: '/chat',	// Default Route
            templateUrl: '/app/views/admin/chat.html',
            controller: 'chatController'
        });

    $locationProvider.html5Mode(true);
}).component("logoutMenu", {
    template: "<div class='user-display' ng-mouseenter='$ctrl.onEnter()' ng-mouseleave='$ctrl.onLeave()'>" +
                "{{ $ctrl.user.username }}" +
                "<ul class='dd-menu' ng-if='!$ctrl.hideLogout'>" +
                    "<a href='/logout'><li>" +
                        "Logout" +
                    "</li></a>" +
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
}).run(function ($socket) {
    $socket.connect(null);
});