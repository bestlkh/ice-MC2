var App = angular.module('ChatRoom',['ngResource','ngRoute','ngStorage','socket.io','ngFileUpload','Controllers','Services', 'angular-spinkit'])
.run(["$rootScope", function ($rootScope){
	//$rootScope.baseUrl = 'http://192.168.10.8:8080'; //Application URL
}]);
App.config(function ($routeProvider, $socketProvider, $locationProvider){
	//$socketProvider.setConnectionUrl('http://192.168.10.8:8080'); // Socket URL

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
});
