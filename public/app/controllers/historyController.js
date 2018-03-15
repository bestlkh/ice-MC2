angular.module('Controllers')
    .controller("historyController", function ($scope, $rootScope, $routeParams, $window) {
        $rootScope.tabActive = "class";

        $scope.hideOverlay = true;
        $scope.hideOauth = true;
        $scope.isLoading = false;
        $scope.error = null;

        $scope.hideToolTip = true;
        $scope.active = false;

        $scope.notif = null;

        $scope.test = false;

        $scope.search = {
            value: ""
        };

        $scope.sessions = [];

        $scope.session = {};

        $scope.selected = null;

        $scope.className = $routeParams.name;

        $scope.dataType = "messages";

        $scope.newNotif = function (message, success) {
            $scope.notif = {message: message};

            clearTimeout($scope.to);
            $scope.to = setTimeout(function () {
                $scope.notif = null;
                $scope.$apply();
            }, 5000);
        };

        $scope.formatDate = function (date, seconds) {
           if (!seconds) return moment(date).format("L")+" "+moment(date).format("LT");
           else return moment(date).format("L")+" "+moment(date).format("LTS");
        };

        $scope.select = function (session) {
            $scope.selected = session;
            if ($scope.selected) $scope.onSelectionChanged();
        };
        
        $scope.onSelectionChanged = function () {
            $scope.Actions.getSession();
        };

        $scope.checkInclude = function (student) {
            if (!$scope.search.value) return true;
            for (var header in student) {

                if (!student[header]) return false;
                if (student[header].toString().indexOf($scope.search.value) !== -1)
                    return true;
            }
        };

        $scope.onChangeType = function (type) {
            $scope.dataType = type;
            $scope.onSelectionChanged();
        };

        $scope.Actions = {
            getSessionList: function () {
                $.ajax({
                    url: "/v1/api/classrooms/"+$scope.className+"/sessions",
                    success: function (result) {
                        $scope.sessions = result;
                        $scope.select($scope.sessions[0]);
                        $scope.$apply();
                    }
                })
            },
            getSession: function () {
                if (!$scope.selected) return;
                $.ajax({
                    url: "/v1/api/classrooms/"+$scope.className+"/sessions/"+$scope.selected.sessionId+"/"+$scope.dataType,
                    success: function (result) {
                        $scope.session = result;
                        $scope.$apply();
                    },
                    error: function () {
                        $scope.session = null;
                        $scope.$apply();
                    }
                })
            }
        };

        $scope.onExport = function () {
            if (!$scope.selected || !$scope.selected.sessionId) return;
            $window.open("/v1/api/classrooms/"+$routeParams.name+"/sessions/"+$scope.selected.sessionId+"/"+$scope.dataType+".csv", "_self");
        };

        $scope.onExportAll = function () {
            $window.open("/v1/api/classrooms/"+$routeParams.name+"/sessions/"+$scope.dataType+".csv", "_self");
        };

        $scope.Actions.getSessionList();

        if (!$rootScope.user) {
            $.ajax({
                url: "/v1/api/session/current",
                success: function (result) {
                    $rootScope.user = result;
                    $scope.$apply();
                }
            });
        }
    });