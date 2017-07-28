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

    $stateProvider.state("news", {
        url: "/news",
        templateUrl: "app/components/news.html",
        title: "News",
        controller: "NewsController",
        controllerAs: "news"
    });


    $stateProvider.state("shuttle", {
        url: "/shuttle",
        templateUrl: "app/components/shuttle.html",
        title: "Shuttle Service",
        controller: "ShuttleController",
        controllerAs: "shuttle"
    });

    $stateProvider.state("shuttleLocations", {
        url: "/shuttleLocations",
        templateUrl: "app/components/shuttle-locations.html",
        title: "Pick Up Locations",
        controller: "ShuttleLocationsController",
        controllerAs: "shuttleLocations"
    });

    $stateProvider.state("impressions", {
        url: "/impressions",
        templateUrl: "app/components/impressions.html",
        title: "Impressions",
        controller: "ImpressionsController",
        controllerAs: "impressions"
    });

    $stateProvider.state("about", {
        url: "/about",
        templateUrl: "app/components/about.html",
        title: "About",
        controller: "AboutController",
        controllerAs: "about"
    });

}]);
