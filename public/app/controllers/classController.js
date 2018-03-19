angular.module('Controllers')
    .controller("classController", function ($scope, $rootScope, $routeParams, $window, $socket, $location) {
        $rootScope.tabActive = "class";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.hideToolTip = true;
        $scope.active = false;

        $scope.classroom = {};

        $scope.test = false;

        $scope.search = {
            value: ""
        };

        $scope.classrooms = [

        ];

        $scope.notif = null;

        $scope.selected = null;

        $scope.select = function (room) {
            $scope.selected = room;
        };

        $scope.checkInclude = function (student) {
            if (!$scope.search.value) return true;

            for (var header in student) {
                if (!student[header]) continue;
                if (!student[header].indexOf) return student[header] === ($scope.search.value === "true");
                if (student[header].indexOf($scope.search.value) !== -1)
                    return true;
            }
        };

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message, error: !success};

            $scope.$apply();
            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.Actions = {
            getClassList: function () {
                $.ajax({
                    url: "/v1/api/classrooms",
                    success: function (result) {
                        $scope.classrooms = result;
                        $scope.$apply();
                    }
                })
            },
            onClassSubmit: function () {
                $.ajax({
                    method: "POST",
                    url: "/v1/api/classrooms",
                    data:  JSON.stringify($scope.classroom),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        //$scope.tas = result;
                        $scope.hideImport = $scope.hideOverlay = true;
                        $scope.active = false;
                        $scope.Actions.getClassList();
                        $scope.classroom = {};

                        $scope.newNotif("Successfully added", true);

                    },
                    error: function (err) {
                        $scope.newNotif(err.responseJSON.message, false);
                    }
                })
            },
            onConnect: function () {
                $window.open("/#/v1/"+$scope.selected.roomName+"?nsp="+$rootScope.user.username, "_blank");
            },
            onDeleteClick: function () {
                $.ajax({
                    url: "/v1/api/classrooms/"+$scope.selected.name,
                    method: "DELETE",
                    success: function (result) {
                        $scope.Actions.getClassList();
                        $scope.selected = null;

                        $scope.$apply();
                        $scope.newNotif("Successfully deleted", true);
                    }
                })
            }
        };

        $scope.onAddClick = function () {
            $scope.hideAdd = $scope.hideOverlay = false;
            // setTimeout(function () {
            //     $scope.active = true;
            //     $scope.$apply();
            // }, 30);
        };

        $scope.onCancelClick = function () {
            $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            $scope.active = false;
        };

        $scope.onOverlayClick = function ($event) {
            var form = document.getElementsByClassName("import-wrapper")[0];
            if ($event.target !==  form && !form.contains($event.target)) {
                $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            }
        };

        $scope.startStatus = function () {

            var socket = io($location.host() +":"+ $location.port()+"/"+$rootScope.user.username, {timeout: 5000, reconnectionAttempts: 10, reconnectionDelay: 2000});
            socket.on("connect", function () {
                $rootScope.statusController = setInterval(function() {

                        socket.emit("get-status", function (data) {

                            for (var room in data) {
                                for (var i = 0; i < $scope.classrooms.length; i++) {
                                    if ($scope.classrooms[i].roomName !== room) continue;
                                    $scope.classrooms[i].online = data[room].online;
                                }
                            }

                            $scope.$apply();


                    });

                }, 500);
            });
        };

        $scope.onDetailClick = function () {
            $location.path("/classrooms/"+$scope.selected.name);
        };

        $scope.$on('$destroy', function() {
            clearInterval($rootScope.statusController);
        });


        $scope.Actions.getClassList();


        if (!$rootScope.user) {
            $.ajax({
                url: "/v1/api/session/current",
                success: function (result) {
                    $rootScope.user = result;
                    $scope.$apply();

                    $scope.startStatus();
                }
            })
        } else {
            $scope.startStatus();
        }
    });