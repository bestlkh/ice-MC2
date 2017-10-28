angular.module('Controllers')
    .controller("chatSettingsController", function ($scope, $rootScope, $routeParams) {
        $rootScope.tabActive = "cs";

        $scope.settings = {};
        $scope.originalSettings = {};

        $scope.block = {
            roomName: true,
            save: true
        };

        $.ajax({
            url: "/v1/api/settings/chat",
            success: function (result) {
                $scope.settings = result;
                $scope.originalSettings = jQuery.extend({}, result);
                $scope.$apply();

                $scope.$watch("settings", function () {
                    $scope.onFormChange();
                }, true);
            }
        });

        $scope.test = function (test) {
            console.log(typeof(test));
        };

        $scope.onFormChange = function () {
            $scope.block.save = (checkSettings());
        };

        function checkSettings() {
            for (var key in $scope.settings) {
                if ($scope.settings[key] !== $scope.originalSettings[key]) return false;
            }
            return true;
        }



        $scope.checkType = function (setting, type) {
            return typeof(setting) === type;
        };

        $scope.Actions = {
            onSettingSubmit: function () {
                $.ajax({
                    method: "POST",
                    url: "/v1/api/settings/chat",
                    data: JSON.stringify({settings: $scope.settings}),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        $scope.block = {
                            roomName: true
                        };
                        $scope.$apply();
                    }
                })
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