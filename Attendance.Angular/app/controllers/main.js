﻿var app = angular.module('attendance', ['ui.bootstrap']);

app.controller('VisitCtrl', function ($scope, $http) {

    $scope.persons = {}; // PersonCtrl will access this too.

    $scope.saveVisits = function () {

        console.log('saving');
        console.table($scope.persons); // works in firefox 34


    };

});

app.controller('DatepickerCtrl', function ($scope) {

    // set dt as today's date
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.format = 'dd-MMMM-yyyy';
});

app.controller('PersonCtrl', function ($scope, $http) {

    //#region TODO Set this as a app wide constant or service somewhere
    var apiBaseUrl = "http://attendance1-api.azurewebsites.net/api";
    if (window.location.href.indexOf('localhost') >= 0) {
        var apiBaseUrl = 'http://localhost/attendance.webapi/api'
    }
    //#endregion

    var personApiUrl = apiBaseUrl + "/person";

    function initNewPerson() {
        $scope.newPerson = { First: '', Last: '', Id: null };
    }
    initNewPerson();

    $scope.addPerson = function () {
        var newPerson = {
            FirstName: $scope.newPerson.First,
            LastName: $scope.newPerson.Last
        };

        $http.post(personApiUrl, newPerson)
            .success(function (data, status, headers, config) {
                $scope.persons.push(data);
                initNewPerson();
            })
            .error(function (data, status, headers, config) { });
    };

    $http.get(personApiUrl)
        .success(function (data, status, headers, config) {
            $scope.$parent.persons = data;
        })
        .error(function (data, status, headers, config) { });
});

app.controller('EventCtrl', function ($scope) {

    $scope.events = [
        { Name: "Conjuring Club" },
        { Name: "Internet of Things" }
    ];

});
