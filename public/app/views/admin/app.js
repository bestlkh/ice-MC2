var App = angular.module('Admin',['ngRoute','ngStorage','socket.io','Controllers', 'ngMaterial', 'angular-spinkit'])
    .run(["$rootScope", function ($rootScope){
        //$rootScope.baseUrl = 'http://142.1.93.22:8080'; //Application URL
    }]);
App.config(function ($routeProvider, $locationProvider){
    //$socketProvider.setConnectionUrl('http://142.1.93.22:8080'); // Socket URL
    $routeProvider	// AngularJS Routes
        .when('/ta/create', {
            templateUrl: '/app/views/admin/ta.html',
            controller: 'taController'
        })
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
        }).
        when("/classrooms/:name/history", {
            templateUrl: '/app/views/admin/classHistory.html',
            controller: 'historyController'
        }).
        when("/ta/:id", {
            templateUrl: '/app/views/admin/ta.html',
            controller: 'taController'
        })
        .otherwise({
            redirectTo: '/classrooms',	// Default Route
            templateUrl: '/app/views/admin/chat.html',
            controller: 'chatController'
        });

    $locationProvider.html5Mode(true);
}).component("logoutMenu", {
    template: "<div class='user-display' ng-click='$ctrl.onClick()'>" +
                "<div class='user-avatar' ng-style=\"{'background':'transparent url(/app/css/dist/img/' + $ctrl.user.userAvatar + ')'}\"></div>" +
                "<div>{{ $ctrl.user.username }}</div>" +
                "<ul class='dd-menu' ng-if='!$ctrl.hideLogout'>" +
                    "<a href='/logout'><li>" +
                        "Logout" +
                    "</li></a>" +
                "</ul> " +
            "</div>",
    controller: function($scope) {
        this.hideLogout = true;
        this.interval = null;

        this.getAvatar = function () {
            return {'background-image': "URL(/app/css/dist/img/" + (this.user ? this.user.userAvatar : 'Avatar1.jpg') +")"}
        };

        this.onClick = function () {
            this.hideLogout = !this.hideLogout;

        };
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