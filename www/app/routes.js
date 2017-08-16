"use strict";

angular.module("ngapp").config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/main");

    $stateProvider.state("main", {
        url: "/main",
        templateUrl: "app/components/main.html",
        title: "28th EBS Symposium",
        controller: "MainController",
        controllerAs: "main"
    });

    $stateProvider.state("personal", {
        url: "/personal",
        templateUrl: "app/components/schedule.html",
        title: "My Schedule",
        controller: "ScheduleController",
        controllerAs: "schedule"
    });

    $stateProvider.state("schedule", {
        url: "/schedule",
        templateUrl: "app/components/schedule.html",
        title: "General Schedule",
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
        title: "Partners & Sponsors",
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

    $stateProvider.state("shuttle.request", {
        url: "/shuttleRequest",
        onEnter: ['$stateParams', '$state', '$mdDialog', '$resource', function($stateParams, $state, $mdDialog, $resource) {
            
            $mdDialog.show($mdDialog.confirm()
                .title('Would you like to delete your debt?')
                .textContent('All of the banks have agreed to forgive you your debts.')
                .ariaLabel('Lucky day')
                .targetEvent(ev)
                .ok('Please do it!')
                .cancel('Sounds like a scam'))
            .then(function() {
                
            }, function() {
                
            });

          
        }]
    });

    $stateProvider.state("impressions", {
        url: "/impressions",
        templateUrl: "app/components/impressions.html",
        title: "Photo Wall",
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
