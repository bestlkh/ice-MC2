angular.module('Controllers')
    .controller("classDetailController", function ($scope, $rootScope, $routeParams, $window, $socket, $location) {
        $rootScope.tabActive = "class";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.hideToolTip = true;
        $scope.active = false;

        $scope.className = $routeParams.name;

        $scope.classroom = {};

        $scope.settings = {};
        $scope.originalSettings = {};

        $scope.block = {
            roomName: true,
            save: true
        };

        $scope.notif = null;

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message, error: !success};

            $scope.$apply();
            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.onFormChange = function () {
            $scope.block.save = (checkSettings());
        };

        function checkSettings() {

            for (var key in $scope.originalSettings) {
                // if ($scope.originalSettings[key] === null) $scope.originalSettings[key] = false;
                if ($scope.classroom[key] !== $scope.originalSettings[key]) return false;
            }
            return true;
        }


        $scope.Actions = {
            getClass: function () {
                $.ajax({
                    url: "/v1/api/classrooms/"+$scope.className,
                    success: function (result) {
                        $scope.classroom = result;
                        $scope.originalSettings = jQuery.extend({}, result);
                        $scope.$apply();

                        $scope.$watch("classroom", function () {
                            $scope.onFormChange();
                        }, true);
                    }
                });

            },
            onClassSubmit: function () {
                $.ajax({
                    method: "PATCH",
                    url: "/v1/api/classrooms/",
                    data:  JSON.stringify($scope.classroom),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        //$scope.tas = result;
                        $scope.Actions.getClass();

                        $scope.newNotif("Updated classroom", true);

                        $scope.block.roomName = true;

                    },
                    error: function (err) {
                        $scope.newNotif(err.responseJSON.message, false);
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

        $scope.checkInclude = function (student) {
            if (!$scope.search.value) return true;
            for (var header in student) {
                if (student[header].indexOf($scope.search.value) !== -1)
                    return true;
            }
        };

        $scope.onOverlayClick = function ($event) {
            var form = document.getElementsByClassName("import-wrapper")[0];
            if ($event.target !==  form && !form.contains($event.target)) {
                $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            }
        };


        $scope.$on('$destroy', function() {
            clearInterval($rootScope.statusController);
        });



        $scope.Actions.getClass();


        if (!$rootScope.user) {
            $.ajax({
                url: "/v1/api/session/current",
                success: function (result) {
                    $rootScope.user = result;
                    $scope.$apply();

                }
            })
        }
    });