var App = angular.module('ChatRoom',['ngResource','ngRoute','ngStorage','socket.io','ngFileUpload','Controllers','Services', 'angular-spinkit'])
.run(["$rootScope", function ($rootScope, $location, $socket){

}]);
App.config(function ($routeProvider, $socketProvider, $locationProvider){

	$routeProvider	// AngularJS Routes
	.when('/v1/:roomId', {
		templateUrl: 'app/views/login.html',
		controller: 'loginCtrl'
	})
	.when('/v1/ChatRoom/:roomId', {
		templateUrl: 'app/views/chatRoom.html',
		controller: 'chatRoomCtrl'
	})
	.otherwise({		
        redirectTo: '/v1/',	// Default Route
        templateUrl: 'app/views/login.html',
        controller: 'loginCtrl'
    });

    //$locationProvider.html5Mode(true);
}).run(function ($location, $socket) {
    $socket.connect($location.host() +":"+ $location.port()+"/"+$location.search().nsp);
});
