"use strict";

angular.module("ngapp").controller("ShuttleController", function(shared, NgMap, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });   

    this.title = $state.current.title;
});
