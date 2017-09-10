angular.module('Controllers', [])
    .controller("dashboardController", function ($scope, $rootScope, $routeParams) {
        $rootScope.tabActive = "dash";

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