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
	// Variables Initialization.

	// selects from the 8 available avatars
	let randomAvatar = String(Math.ceil(Math.random() * 8));

	$scope.userAvatar = randomAvatar;
	$scope.isErrorReq = false;
	$scope.isErrorNick = false;
    $scope.form = {};
    $scope.form.username = "";
    $scope.form.initials = "";

	$scope.errMsg = null;
	$scope.showErr = false;

	$scope.newRoomOption = false;

	$scope.form.roomId = $routeParams.roomId;
	$scope.isJoin = true;
	$scope.roomId = $routeParams.roomId;
	$scope.token = $location.search().token;
	$scope.utorid = "-----";
	$scope.error = null;
	$scope.to = null;

	$scope.isLoading = true;

	$scope.form.username = $rootScope.username;

    $scope.ta = false;

    $scope.printErr = function(msg){	// popup for error message
        $scope.errMsg = msg;
        $scope.showErr = true;

        clearTimeout($scope.to);
        $scope.to = setTimeout(function () {
            $scope.showErr = false;
            $scope.$apply();
        }, 5000);

    };

    var nsp = "";

    if ($location.search().nsp) {
        $.ajax({
            url: "/v1/api/namespace/"+$location.search().nsp,
            error: function (err) {
                $scope.error = err.responseJSON;
                $scope.isLoading = false;
                $scope.$apply();

            }
        });
        nsp = "/" + $location.search().nsp;
    }

	$socket.disconnect();
    $socket.connect($location.host() +":"+ $location.port()+nsp);
	$scope.nsp = nsp;



		if ($rootScope.error) {
            $scope.isLoading = false;

            $scope.printErr($rootScope.error);
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
			if (result.username) {
                $rootScope.loggedIn = true;
                $rootScope.username = result.username;
                $location.path('/v1/ChatRoom/'+$routeParams.roomId);
			} else if (result.success) {
				var url = "/login/";
				$window.open(url, "_self");
			}
        });
    };

    /**
	 * Automatically update user's initial
     */
	$scope.changeInitials = function () {
		let initials = "";
		if ($scope.form.username) {
			let name = $scope.form.username.split(" ");
			if(name.length >= 2) {
				initials = name[0].substring(0,1).toUpperCase() + name[name.length - 1].substring(0,1).toUpperCase();
			} else {
				initials = $scope.form.username.substring(0,2).toUpperCase();
			}
		}
		$scope.form.initials = initials;
    };

	$scope.toggle = function (isJoin) {
		$scope.isJoin = isJoin;
    };

	// Functions for controlling behaviour.
	$scope.redirect = function(create) {
		// reset the error flags
		$scope.isErrorReq = false;
		$scope.isErrorNick = false;
		$scope.newRoomOption = false;

		if($scope.ta || ($scope.form.username && $scope.form.roomId)) {
			if ($scope.ta || ($scope.form.username.length <= 20 && $scope.form.roomId.length <= 50)) {
				$socket.emit('new user',{secret: $scope.form.secret, username : $scope.form.username, userAvatar : $scope.userAvatar, initials : $scope.form.initials, roomId: $scope.form.roomId, isJoin: $scope.isJoin && !create, token: $scope.token},function(data){
					//console.log(data);
					if(data.success == true){	// if nickname doesn't exists
						$rootScope.username = data.username || $scope.form.username;
						$rootScope.initials = $scope.form.initials;
						$rootScope.userAvatar = $scope.userAvatar;
						$rootScope.loggedIn = true;

						// We are entering chatroom here
						$("body").css({
							'overflow': 'hidden'
						});

						if (!$scope.isJoin || !$scope.roomId) $location.path('/v1/ChatRoom/'+$scope.form.roomId);
						else $location.path('/v1/ChatRoom/'+$scope.roomId);

					} else {
						// print custom errors if duplication occurs
						if (data.issue === "noRoomExists") {
							$scope.newRoomOption = true;
						} else {
							$scope.errMsg = data.message;
							$scope.printErr($scope.errMsg);
							
							if (data.issue === "roomExists") {
								$scope.isErrorReq = false;
							} else if (data.issue === "userExists") {
								$scope.isErrorNick = true;
							}
						}
					}
				});
			} else {		// should not normally be able to reach here due to html maxlength constraint
				$scope.isErrorReq = true;

				if ($scope.form.username.length > 20) {
					$scope.errMsg = "Username exceeds 20 characters.";
					$scope.isErrorNick = true;
					$scope.printErr($scope.errMsg);
				} else if ($scope.form.roomId.length > 50) {
					$scope.errMsg = "Room name exceeds 50 characters.";
					$scope.printErr($scope.errMsg);
				}				
			}
		}	
	};

	$scope.changeAvatar = function(avatar){		// selecting different avatar
			$scope.userAvatar = avatar;
	}

	$scope.loginError = function () {
		if ($scope.form.username && $scope.form.roomId && $scope.form.initials) {
			$scope.isErrorReq = false;
		} else {
			$scope.isErrorReq = true;
		}
	}
});
