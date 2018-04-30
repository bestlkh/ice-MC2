angular.module('Controllers')
    .controller("acctSettingsController", function ($scope, $rootScope, $routeParams) {
        $rootScope.tabActive = "acct";

        $scope.settings = {};
        $scope.originalSettings = {};

        $scope.avatar = null;
        $scope.editAvatar = false;

        $scope.notif = null;

        $scope.block = {
            save: true
        };

        $scope.onEdit = function () {
            $scope.editAvatar = !$scope.editAvatar;
        };

        $scope.setAvatar = function (i) {
            $scope.settings.userAvatar = "Avatar"+i+".jpg";
            $scope.editAvatar = false;
            $scope.avatar = null;
        };

        $scope.getAvatar = function () {
            return $scope.avatar ? $scope.settings.userAvatar : "/app/css/dist/img/"+$scope.settings.userAvatar;
        };

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

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message, error: !success};
            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.checkType = function (setting, type) {
            return typeof(setting) === type;
        };

        $scope.Actions = {
            onGetUser: function () {
                $.ajax({
                    url: "/v1/api/settings/account",
                    success: function (result) {
                        $scope.settings = result;
                        $scope.originalSettings = jQuery.extend({}, result);
                        $scope.$apply();

                        $scope.$watch("settings", function () {
                            $scope.onFormChange();
                        }, true);
                    }
                });
            },
            onUpdateSettings: function () {
                var form = new FormData();
                form.append("image", $scope.avatar);
                for (var key in $scope.settings) {
                    if (key === "userAvatar" && $scope.avatar) continue;
                    form.append(key, $scope.settings[key]);
                }
                $.ajax({
                    method: "PATCH",
                    url: "/v1/api/settings/account",
                    data: form,
                    processData: false,
                    contentType: false,
                    success: function (result) {

                        $scope.active = false;
                        $scope.Actions.onGetUser();
                        $rootScope.user = result;
                        console.log($rootScope.user);
                        $scope.settings = {};
                        $scope.avatar = null;
                        $scope.block = {
                            save: true
                        };

                        $scope.newNotif("Successfully Updated", true);

                    },
                    error: function (err) {
                        $scope.newNotif(err.responseJSON.message, false);
                        $scope.$apply();
                    }
                })
            },
            onUploadAvatar: function (avatar) {

                $scope.avatar = avatar;
                var reader = new FileReader();

                reader.onload = function (e) {
                    $scope.settings.userAvatar = e.target.result;
                    $scope.editAvatar = false;
                    $scope.$apply();
                };

                reader.readAsDataURL(avatar);
            }
        };

        $scope.Actions.onGetUser();

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