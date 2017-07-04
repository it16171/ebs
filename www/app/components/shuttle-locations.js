"use strict";

angular.module("ngapp").controller("ShuttleLocationsController", function(shared, NgMap, $state, $scope, $localStorage, $mdComponentRegistry, $mdToast, $http){

    var ctrl = this;

    this.$storage = $localStorage;

    this.requestShuttle = function (locationId) {
        
      $http({method: 'GET',url: 'https://ebs.api.nubenum.de/v1/shuttle.php?do=request&location='+locationId+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        ctrl.$storage.settings.shuttleRequestedTo = locationId;
        $state.transitionTo('shuttle');
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
