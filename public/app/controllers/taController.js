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
                        $scope.hideAdd = $scope.hideOverlay = true;
                        $scope.active = false;
                        $scope.Actions.getTAList();
                        $scope.ta.name = "";

                        $scope.newNotif("Successfully added", true);
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
            }
        };

        setTimeout(function() {
            $scope.setSelected($routeParams.id)
        }, 10);

        $scope.onAddClick = function () {
            $scope.hideAdd = $scope.hideOverlay = false;
            // setTimeout(function () {
            //     $scope.active = true;
            //     $scope.$apply();
            // }, 30);
        };

        $scope.onCancelClick = function () {
            if ($routeParams.id) $location.path("/ta/");
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