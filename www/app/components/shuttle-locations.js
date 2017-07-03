"use strict";

angular.module("ngapp").controller("ShuttleLocationsController", function(shared, NgMap, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.locations = shared.data.pickupLocations;

    this.requestShuttle = function (location) {
      
    }

    NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });   

    this.title = $state.current.title;
});
