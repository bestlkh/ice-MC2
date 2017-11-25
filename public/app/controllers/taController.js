angular.module('Controllers', [])
    .controller("taController", function ($scope, $rootScope, $routeParams, $window) {
        $rootScope.tabActive = "ta";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.hideToolTip = true;
        $scope.active = false;

        $scope.tas = [];
        $scope.ta = {};

        $scope.notif = null;

        $scope.test = false;

        $scope.search = {
            value: ""
        };

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message};

            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.Actions = {
            getTAList: function () {
                $.ajax({
                    url: "/v1/api/ta",
                    success: function (result) {
                        $scope.tas = result;
                        $scope.$apply();
                    }
                })
            },
            onTASubmit: function () {
                $.ajax({
                    method: "POST",
                    url: "/v1/api/ta",
                    data:  JSON.stringify($scope.ta),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        //$scope.tas = result;
                        $scope.hideImport = $scope.hideOverlay = true;
                        $scope.active = false;
                        $scope.Actions.getTAList();
                        $scope.ta.name = "";

                        $scope.newNotif("Successfully added", true);

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

        $scope.Actions.getTAList();

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