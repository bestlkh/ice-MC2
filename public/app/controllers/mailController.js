angular.module('Controllers', [])
    .controller("mailController", function ($scope, $rootScope, $routeParams, $window) {
        $rootScope.tabActive = "dash";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.guarded = {
            oauth: true
        };

        $scope.hideToolTip = true;

        $scope.Actions = {
            onOauthClick: function () {
                $scope.hideOverlay = $scope.hideOauth = false;
                $scope.isLoading = true;
                $scope.error = null;
                $.ajax({
                    url: "/v1/api/admin/auth/start",
                    success: function (result) {
                        $scope.isLoading = false;
                        $rootScope.user.oauth = result["access_token"];
                        $rootScope.user.email = result.email;
                        $scope.$apply();
                    },
                    error: function () {
                        $scope.isLoading = false;
                        $scope.error = "Oauth failed";
                    }
                });
                $window.open("/admin/auth/outlook");

            }
        };

        $scope.onOverlayClick = function ($event) {
            var form = document.getElementsByClassName("import-wrapper")[0];
            if ($event.target !==  form && !form.contains($event.target)) {
                $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            }
        };

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