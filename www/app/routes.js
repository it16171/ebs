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

    $stateProvider.state("speakersdetail", {
        url: "/speakers/{speakerId}",
        templateUrl: "app/components/speakers.html",
        title: "Speakers",
        controller: "SpeakersController",
        controllerAs: "speakers"
    });

    $stateProvider.state("speakers", {
        url: "/speakers",
        templateUrl: "app/components/speakers.html",
        title: "Speakers",
        controller: "SpeakersController",
        controllerAs: "speakers"
    });

    $stateProvider.state("partners", {
        url: "/partners",
        templateUrl: "app/components/partners.html",
        title: "Partners",
        controller: "PartnersController",
        controllerAs: "partners"
    });

    $stateProvider.state("shuttle", {
        url: "/shuttle",
        templateUrl: "app/components/shuttle.html",
        title: "Shuttle Pick Up Locations",
        controller: "ShuttleController",
        controllerAs: "shuttle"
    });


}]);
