angular.module('Controllers',["ngRoute"])
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
	$scope.userAvatar = "Avatar1.jpg";
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

		if ($rootScope.error) {
            $scope.isLoading = false;
            console.log($rootScope.error);
            $scope.printErr($rootScope.message);
		} else {
			console.log("test");
            $socket.emit('check-session', {roomName: $scope.roomId}, function (data) {

                if (data.username) {

                    $rootScope.loggedIn = true;
                    $rootScope.username = data.username;
                    $rootScope.initials = data.username.substring(0, 2);
                    $rootScope.userAvatar = data.avatar;

                    if ($routeParams.roomId) $location.path('/v1/ChatRoom/' + $routeParams.roomId);
                    else if (data.room) $location.path('/v1/ChatRoom/' + data.room);
                }
                $scope.isLoading = false;
                $scope.$apply();

            });
        }

        if ($scope.token) {
        	$.ajax({
        		url: "/v1/api/room/"+$routeParams.roomId+"/track/"+$scope.token,
				success: function (result) {
					$scope.utorid = result.utorid;
					console.log(result);
					$scope.$apply();
                },
				error: function (err) {
					$scope.error = err.responseJSON;
                }
			})
		}



	// redirection if user logged in.
	if($rootScope.loggedIn && $routeParams.roomId){
		$location.path('/v1/ChatRoom/'+$routeParams.roomId);
	}

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

	$scope.changeInitials = function () {
		$scope.form.initials = $scope.form.username.substring(0,2);
    };

	$scope.toggle = function (isJoin) {
		$scope.isJoin = isJoin;
    };

	// Functions for controlling behaviour.
	$scope.redirect = function(create){

		if ($scope.form.username.length <= 20) {
			if($scope.form.username && $scope.form.roomId){

				$socket.emit('new user',{username : $scope.form.username, userAvatar : $scope.userAvatar, initials : $scope.form.initials, roomId: $scope.form.roomId, isJoin: $scope.isJoin && !create, token: $scope.token},function(data){
					if(data.success == true){	// if nickname doesn't exists

						$rootScope.username = $scope.form.username;
						$rootScope.initials = $scope.form.initials;
						$rootScope.userAvatar = $scope.userAvatar;
						$rootScope.loggedIn = true;

						if (!$scope.isJoin || !$scope.roomId) $location.path('/v1/ChatRoom/'+$scope.form.roomId);
						else $location.path('/v1/ChatRoom/'+$scope.roomId);

					}else{		// if nickname exists
						$scope.errMsg = data.message;

						$scope.isErrorNick = true;
						$scope.isErrorReq = true;
						$scope.printErr($scope.errMsg);
					}			
				});
			}else{		// blanck nickname 
				$scope.errMsg = "Enter a nickname.";
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
