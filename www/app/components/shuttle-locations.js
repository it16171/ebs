"use strict";

angular.module("ngapp").controller("ShuttleLocationsController", function(shared, NgMap, $state, $scope, $mdComponentRegistry, $http){

    var ctrl = this;

    this.locations = shared.data.pickupLocations;

    this.requestShuttle = function (location) {
        
      $http('https://ebs.api.nubenum.de/v1/requestShuttle.php?location='+location.id+'&fcmt='+shared.settings.fcmt).then(function successCallback(response) {
         ctrl.$state.transitionTo('shuttle');
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. Please try again.')
            .hideDelay(5000)
        );
      });       
    }

    

    NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });   

    this.title = $state.current.title;
});
