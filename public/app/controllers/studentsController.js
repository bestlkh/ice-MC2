angular.module('Controllers')
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    scope.$apply(function () {
                        scope.fileread = changeEvent.target.files[0];

                    });
                });
            }
        }
    }])
    .controller("studentsController", function ($scope, $rootScope, $routeParams, $window) {
        $rootScope.tabActive = "students";

        $scope.hideImport = true;
        $scope.hideOverlay = true;
        $scope.hideAdd = true;

        $scope.import = {
            csv: null
        };

        $scope.student = {};

        $scope.search = {
            value: ""
        };

        $scope.students = [];

        $scope.getBase64 = function (file, callback) {
            var reader = new FileReader();

            reader.onload = function(readerEvt) {
                var binaryString = readerEvt.target.result;
                callback(btoa(binaryString));
            };

            reader.readAsBinaryString(file);
        };

        $scope.Actions = {
            getStudentList: function () {
                $.ajax({
                    url: "/v1/api/students",
                    success: function (result) {
                        $scope.students = result;
                        $scope.$apply();
                    }
                })
            },
            putStudentList: function (csv) {
                $.ajax({
                    method: "PUT",
                    url: "/v1/api/students",
                    data:  JSON.stringify({csv: csv}),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        $scope.students = result;
                        $scope.hideImport = $scope.hideOverlay = true;
                        $scope.$apply();
                    }
                })
            },
            patchStudentList: function () {
                $.ajax({
                    method: "PATCH",
                    url: "/v1/api/students",
                    data:  JSON.stringify($scope.student),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        $scope.Actions.getStudentList();
                        $scope.student = {};
                        $scope.hideAdd = $scope.hideOverlay = true;
                    }
                })
            }
        };

        $scope.checkInclude = function (student) {
            if (!$scope.search.value) return true;
            for (var header in student) {
                if (student[header].indexOf($scope.search.value) !== -1)
                    return true;
            }
        };

        $scope.onSearchChange = function () {

        };

        $scope.onImportClick = function () {
            $scope.hideImport = $scope.hideOverlay = false;
        };

        $scope.onAddClick = function () {
            $scope.hideAdd = $scope.hideOverlay = false;
        };

        $scope.onOverlayClick = function ($event) {
            var form = document.getElementsByClassName("import-wrapper")[0];
            if ($event.target !==  form && !form.contains($event.target)) {
                $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
            }
        };

        $scope.onCancelClick = function () {
            $scope.hideImport = $scope.hideAdd = $scope.hideOverlay = true;
        };

        $scope.onImportSubmit = function () {
            $scope.getBase64($scope.import.csv, function (csv) {
                $scope.Actions.putStudentList(csv);
            });
        };

        $scope.onAddSubmit = function () {
            $scope.Actions.patchStudentList();
        };

        $scope.onReset = function () {
            $.ajax({
                url: "/v1/api/admin/students/generate",
                success: function () {
                    $scope.Actions.getStudentList();
                }
            })
        };

        $scope.onExport = function () {
            $window.open("/admin/students/tokens.csv", "_self");
        };


        $scope.Actions.getStudentList();



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