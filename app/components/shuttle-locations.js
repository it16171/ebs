"use strict";

angular.module("ngapp").controller("ShuttleLocationsController", function(shared, NgMap, $state, $scope, $localStorage, $mdComponentRegistry, $mdToast, $mdDialog, $http){

    var ctrl = this;
    this.$storage = $localStorage;
    this.markers = ctrl.$storage.data.pickupLocations;

    this.currentMarker = this.markers[0];

    this.showInfo = function(e,marker) {
      ctrl.currentMarker = marker;
      ctrl.map.showInfoWindow('info', marker.id);
    };

    this.map = null;
    NgMap.getMap().then(function(map) {
      ctrl.map = map;
    });   
 
    this.requestShuttle = function (locationId) {
    
      $http({method: 'GET',url: shared.apiSrv+'shuttle.php?do=request&location='+locationId+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        ctrl.$storage.settings.shuttleRequestedTo = locationId;
        ctrl.$storage.settings.shuttleStatus = response.data.status;
        // $state.transitionTo('shuttle');
        history.back();
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. Please try again.')
            .hideDelay(5000)
        );
      });       
    }


    this.confirmRequest = function (ev, locationId) {
      var confirm = $mdDialog.confirm()
      .title('Ask for a shuttle')
      .textContent('Do you really want to ask for a shuttle now?')
      .ariaLabel('Confirm')
      .targetEvent(ev)
      .ok('Ask now')
      .cancel('Cancel');

      $mdDialog.show(confirm).then(function() {
        ctrl.requestShuttle(locationId)
      }, function() {
        
      });
    }

  

    this.title = $state.current.title;
});