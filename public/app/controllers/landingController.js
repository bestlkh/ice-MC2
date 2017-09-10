angular.module('Controllers', [])
.controller("landingController", function ($scope, $routeParams) {

    $scope.hideMenu = true;

    $scope.menuOnClick = function (e) {
        $scope.hideMenu = !$scope.hideMenu;
    };

    $scope.schedule = [{day: "Monday", start: "1:00 pm", end: "3:00 pm"},
        {day: "Wednesday", start: "1:00 pm", end: "3:00 pm"},
        {day: "Tuesday", start: "11:00 am", end: "1:00 pm"}];

    $scope.isInInterval = function (interval) {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        var day = days[ new Date().getDay() ];

        return (day == interval.day && (moment().format("LT") >= interval.start && moment().format("LT") <= interval.end));
    }
});