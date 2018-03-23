angular.module('Controllers', [])
    .directive("uploadavatar", [function () {
        return {
            scope: {
                uploadavatar: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    scope.$apply(function () {
                        scope.uploadavatar(changeEvent.target.files[0]);

                    });
                });
            }
        }}])
    .controller("taController", function ($scope, $rootScope, $routeParams, $window, $location) {
        $rootScope.tabActive = "ta";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.hideAdd = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.hideToolTip = true;
        $scope.active = false;
        $scope.editAvatar = false;

        $scope.tas = [];
        $scope.ta = {};

        $scope.notif = null;

        $scope.test = false;

        $scope.selected = null;

        $scope.block = {
            name: true,
            token: true,
            save: true
        };

        $scope.search = {
            value: ""
        };

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message, error: !success};
            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.setAvatar = function (i) {
            $scope.ta.avatar = "Avatar"+i+".jpg";
            $scope.editAvatar = false;
        };

        $scope.getAvatar = function () {
            return "/app/css/dist/img/"+$scope.selected.avatar;
        };
        
        $scope.setSelected = function (id, click) {
            if (!id) return;
            if (click) return $location.path("/ta/"+id);
            $scope.Actions.onGetTA(id);
            $scope.hideOverlay = false;
        };

        $scope.onFormChange = function () {
            $scope.block.save = (checkDetails());
        };

        $scope.onEdit = function () {
            $scope.editAvatar = !$scope.editAvatar;
        };

        function checkDetails() {
            for (var key in $scope.ta) {
                if ($scope.ta[key] !== $scope.selected[key]) return false;
            }
            return true;
        }

        if ($rootScope.notif) {
            $scope.newNotif($rootScope.notif.message, $rootScope.notif.success);
            $rootScope.notif = null;
        }

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
                        $location.path("/ta/");
                        $scope.active = false;

                        $rootScope.notif = {message: "Successfully added", success: true};

                        $scope.$apply();
                    },
                    error: function (err) {
                        $scope.newNotif(err.responseJSON.message, false);
                        $scope.$apply();
                    }
                })
            },
            onGetTA: function (id) {
                $.ajax({
                    url: "/v1/api/ta/"+id,
                    success: function (result) {
                        $scope.selected = result;
                        $scope.ta = Object.assign({}, result);

                        $scope.$watch("ta", function () {
                            $scope.onFormChange();
                        }, true);

                        $scope.$apply();
                    },
                    error: function (err) {
                        $rootScope.notif = {message: err.responseJSON.message, success: false};
                        $location.path('/ta');

                        $scope.$apply();
                    }
                })
            },
            onUpdateTA: function () {
                $.ajax({
                    method: "PATCH",
                    url: "/v1/api/ta/"+$scope.selected._id,
                    data:  JSON.stringify($scope.ta),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {

                        $scope.active = false;
                        $scope.Actions.onGetTA($scope.selected._id);
                        $scope.ta = {};
                        $scope.block = {
                            save: true,
                            name: true,
                            token: true
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
                var form = new FormData();
                form.append("image", avatar);

                $.ajax({
                    method: "POST",
                    url: "/v1/api/ta/"+$scope.selected._id+"/avatar",
                    data: form,
                    contentType: false,
                    processData: false,
                    success: function (result) {
                        $scope.ta.avatar = result.avatar;
                        $scope.$apply();
                    }
                })
            },
            onDeleteTA: function () {
                $.ajax({
                    method: "DELETE",
                    url: "/v1/api/ta/"+$scope.selected._id,
                    success: function (result) {
                        $rootScope.notif = {message: "TA deleted", success: true};
                        $location.path("/ta/");
                        $scope.$apply();
                    }
                })
            }
        };

        setTimeout(function() {
            $scope.setSelected($routeParams.id);
            $scope.setCreate();
        }, 10);

        $scope.setCreate = function () {
            if ($location.path() !== "/ta/create") return;
            $scope.hideAdd = $scope.hideOverlay = false;
            $scope.$apply();
        };

        $scope.onAddClick = function () {
            $location.path("/ta/create");
        };

        $scope.onCancelClick = function () {
            if ($routeParams.id || $location.path() === "/ta/create") $location.path("/ta/");
            $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            //$scope.selected = null;
            //$scope.ta = {};



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

        if (!$routeParams.id) $scope.Actions.getTAList();

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