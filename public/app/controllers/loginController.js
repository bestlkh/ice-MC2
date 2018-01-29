angular.module('Controllers',["ngRoute", "ngSanitize"])
.directive('focusMe', function($timeout) {	// Custom directive for focus
    return {
        link: function(scope, element, attrs) {
          scope.$watch(attrs.focusMe, function(value) {
            if(value === true) { 
              $timeout(function() {
                element[0].focus();
                scope[attrs.focusMe] = false;
              });
            }
          });
        }
    };
})
.controller('loginCtrl', function ($scope, $location, $rootScope, $socket, $routeParams, $window){		// Login Controller
	// Varialbles Initialization.
	$scope.userAvatar = "1";
	$scope.isErrorReq = false;
	$scope.isErrorNick = false;
    $scope.form = {};
	$scope.form.username = "";
	$scope.form.initials = "";
	$scope.errMsg = "";

	$scope.form.roomId = $routeParams.roomId;
	$scope.isJoin = true;
	$scope.roomId = $routeParams.roomId;
	$scope.token = $location.search().token;
	$scope.utorid = "-----";
	$scope.error = null;

	$scope.isLoading = true;

    $scope.form.username = $rootScope.username;

    $scope.ta = false;

    $scope.printErr = function(msg){	// popup for error message
        var html = '<p id="alert">'+ msg +'</p>';
        if ($( ".chat-box" ).has( "p" ).length < 1) {
        	console.log("check");
            $(html).hide().prependTo(".chat-box").fadeIn(1500);
            $('#alert').delay(5000).fadeOut('slow', function(){
                $('#alert').remove();
            });
        }
    };

    var nsp = "";
    if ($location.search().nsp)
        nsp = "/"+$location.search().nsp;
    $socket.connect($location.host() +":"+ $location.port()+nsp);
	$scope.nsp = nsp;

		if ($rootScope.error) {
            $scope.isLoading = false;
            console.log($rootScope.error);
            $scope.printErr($rootScope.message);
		} else {
            $socket.emit('check-session', {roomName: $scope.roomId}, function (data) {

                if (data.username && $routeParams.roomId) {

                    $rootScope.loggedIn = true;
                    $rootScope.username = data.username;
                    $rootScope.initials = data.username.substring(0, 2);
                    $rootScope.userAvatar = data.avatar;

                    $location.path('/v1/ChatRoom/' + $routeParams.roomId);

                }
                $scope.isLoading = false;
                $rootScope.isAdmin = data.isAdmin;

            });
        }

        if ($scope.token && $location.search().nsp) {
        	$.ajax({
        		url: "/v1/api/namespace/"+$location.search().nsp+"/room/"+$routeParams.roomId+"/track/"+$scope.token,
				success: function (result) {
					$scope.utorid = result.utorid;
					console.log(result);
					$scope.$apply();
                },
				error: function (err) {
					$scope.error = err.responseJSON;
					console.log(err);
                }
			})
		}



	// redirection if user logged in.
	if($rootScope.loggedIn && $routeParams.roomId){
		$location.path('/v1/ChatRoom/'+$routeParams.roomId);
	}

	$scope.onTaClick = function () {
		$scope.ta = !$scope.ta;
    };

	$scope.onInstructorLogin = function () {
		$socket.emit("instructor_login", {roomName: $scope.roomId}, function (result) {
			if (!result.token) {
                $rootScope.loggedIn = true;
                $rootScope.username = result.username;
                $location.path('/v1/ChatRoom/'+$routeParams.roomId);
			} else {
				var url = "/login/?token="+result.token;
				$window.open(url, "_self");
			}

        });

    };

    /**
	 * Automatically update user's initial
     */
	$scope.changeInitials = function () {
		let name = $scope.form.username.split(" ");
		let initials;
		if(name.length >= 2){
			initials = name[0].substring(0,1).toUpperCase() + name[name.length - 1].substring(0,1).toUpperCase();
		} else {
            initials = $scope.form.username.substring(0,2).toUpperCase();
		}
		$scope.form.initials = initials;
    };

	$scope.toggle = function (isJoin) {
		$scope.isJoin = isJoin;
    };

	// Functions for controlling behaviour.
	$scope.redirect = function(create){

		if ($scope.form.username.length <= 20) {
			if($scope.form.username && $scope.form.roomId){

				$socket.emit('new user',{secret: $scope.form.secret, username : $scope.form.username, userAvatar : $scope.userAvatar, initials : $scope.form.initials, roomId: $scope.form.roomId, isJoin: $scope.isJoin && !create, token: $scope.token},function(data){
					if(data.success == true){	// if nickname doesn't exists
						$rootScope.username = $scope.form.username;
						$rootScope.initials = $scope.form.initials;
						$rootScope.userAvatar = $scope.userAvatar;
						$rootScope.loggedIn = true;

						// We are entering chatroom here
						$("body").css({
							'overflow': 'hidden'
						});

						if (!$scope.isJoin || !$scope.roomId) $location.path('/v1/ChatRoom/'+$scope.form.roomId);
						else $location.path('/v1/ChatRoom/'+$scope.roomId);

					}else{		// if nickname exists
						$scope.errMsg = data.message;

						$scope.isErrorNick = true;
						$scope.isErrorReq = true;
						$scope.printErr($scope.errMsg);
					}
				});
			} else {		// blank username or room name
				$scope.errMsg = "Please enter both username & room name.";
				$scope.isErrorReq = true;
				$scope.printErr($scope.errMsg);
			}
		}else{		// nickname greater than limit
			$scope.errMsg = "Nickname exceed 20 charachters.";
			$scope.isErrorNick = true;
			$scope.isErrorReq = true;
			$scope.printErr($scope.errMsg);
		}
	};



	$scope.changeAvatar = function(avatar){		// secting different avatar
			$scope.userAvatar = avatar;
	}
});
