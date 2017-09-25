angular.module('Controllers')
    .directive("iframeOnLoad", function(){
        return {
            scope: {
                onLoad: '&iframeOnLoad'
            },
            link: function(scope, element, attrs){
                element.on('load', function(){
                    return scope.onLoad();
                })
            }
        }})
    .controller("chatController", function ($scope, $rootScope, $routeParams, $socket, $window) {
        $rootScope.tabActive = "chat";

        $scope.controller = {
            status: "Offline",
            people: 0,
            sendResult: null,
            connected: false
        };

        $scope.startController = function() {
            if ($rootScope.chatController) clearInterval($rootScope.chatController);
            $rootScope.chatController = setInterval(function () {
                $socket.emit("admin_get_status", {token: $scope.controller.token}, function (data) {
                    if (!data) {
                        console.log("Failed to retrieve status...aborting.");
                        return clearInterval($rootScope.chatController);
                    }
                    $scope.controller.people = data.online;
                    $scope.controller.status = data.status;

                });
            }, 1000);
        };

        $socket.on("stop_controller", function () {
            $scope.controller.connected = false;
        });

        $scope.$on('$destroy', function() {
            clearInterval($rootScope.chatController);
        });

        $socket.on("disconnect", function () {
            if ($rootScope.chatController) clearInterval($rootScope.chatController);
        });

        $scope.settings = {};

        $scope.Actions = {
            chatFullscreen: function () {
                var elem = $(".chat-room-frame")[0];
                var requestFullscreen = elem.requestFullscreen || elem.msRequestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen;
                requestFullscreen.call(elem);
            },
            sendTrackEmails: function () {
                $.ajax({
                    url: "/v1/api/admin/sendEmail",
                    success: function (result) {
                        $scope.controller.sendResult = result;

                        $scope.$apply();
                    }
                })
            },
            resetTokens: function () {
                $.ajax({
                    url: "/v1/api/admin/resetTokens",
                    success: function (result) {
                        $scope.controller.sendResult = result;
                        $scope.$apply();
                    }
                })
            },
            getTokens: function () {
                $.ajax({
                    url: "/v1/api/admin/getTokens",
                    success: function (result) {
                        $scope.controller.sendResult = result;
                        $scope.$apply();
                    }
                })
            },
            getSessionToken: function () {
                $.ajax({
                    url: "/v1/api/chat/start",
                    success: function (result) {
                        $scope.controller.connected = true;
                        $scope.$apply();
                    }
                })
            }
        };


            $.ajax({
                url: "/v1/api/session/current",
                success: function (result) {
                    $rootScope.user = result;
                    $scope.controller.connected = result.connected;
                    console.log(result);
                    $scope.$apply();
                }
            });

        $.ajax({
            url: "/v1/api/settings/chat",
            success: function (result) {
                $scope.settings = result;
                $scope.$apply();
            }
        })

    });

