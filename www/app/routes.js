"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main.html",
        title: "EBS Symposium 2017",
        controller: "MainController",
        controllerAs: "main"
    });

    $stateProvider.state("schedule", {
        url: "/schedule",
        templateUrl: "app/components/schedule.html",
        title: "Schedule",
        controller: "ScheduleController",
        controllerAs: "schedule"
    });

    $stateProvider.state("speakers", {
        url: "/speakers/{speakerId}",
        templateUrl: "app/components/speakers.html",
        title: "Speakers",
        controller: "SpeakersController",
        controllerAs: "speakers"
    });

    $stateProvider.state("speakersd", {
        url: "/speakers",
        templateUrl: "app/components/speakers.html",
        title: "Speakers",
        controller: "SpeakersController",
        controllerAs: "speakers"
    });


}]);
