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
                        // or all selected files:
                        // scope.fileread = changeEvent.target.files;
                    });
                });
            }
        }
    }])
    .controller("studentsController", function ($scope, $rootScope, $routeParams) {
        $rootScope.tabActive = "students";

        $scope.hideImport = true;

        $scope.import = {
            csv: null
        };

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
            postStudentList: function (csv) {
                $.ajax({
                    method: "POST",
                    url: "/v1/api/students",
                    data:  JSON.stringify({csv: csv}),
                    processData: false,
                    contentType: "application/json",
                    success: function (result) {
                        $scope.students = result;
                        $scope.hideImport = true;
                        $scope.$apply();
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
            $scope.hideImport = false;
        };

        $scope.onOverlayClick = function ($event) {
            var form = document.getElementsByClassName("import-wrapper")[0];
            if ($event.target !==  form && !form.contains($event.target)) {
                $scope.hideImport = true;
            }
        };

        $scope.onCancelClick = function () {
            $scope.hideImport = true;
        };

        $scope.onImportSubmit = function () {
            $scope.getBase64($scope.import.csv, function (csv) {
                $scope.Actions.postStudentList(csv);
            });
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