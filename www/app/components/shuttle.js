"use strict";

angular.module("ngapp").controller("ShuttleController", function(shared, $state, $scope, $localStorage, $http, $timeout, $mdToast, $mdComponentRegistry){

    var ctrl = this;
    this.$storage = $localStorage;
    this.title = $state.current.title;
    this.getObjectById = shared.getObjectById;
    this.requestShuttle = shared.requestShuttle;

    this.cancelShuttle = function () {
        
      $http({method: 'GET',url: shared.apiSrv+'shuttle.php?do=cancel&location='+ctrl.$storage.settings.shuttleRequestedTo+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        ctrl.$storage.settings.shuttleStatus = 3;
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. Please try again.')
            .hideDelay(5000)
        );
      });       
    }

    this.getShuttleInfo = function () {
      console.log("status update event");
      $http({method: 'GET',url: shared.apiSrv+'shuttle.php?do=status&location='+ctrl.$storage.settings.shuttleRequestedTo+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        if (!response.data.error) {
            ctrl.$storage.settings.shuttleStatus = response.data.status;
        } else {
             ctrl.$storage.settings.shuttleStatus = null;
             ctrl.$storage.settings.shuttleRequestedTo = null;
        }
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. The shuttle status can\'t be updated.')
            .hideDelay(5000)
        );
      });     
      if (ctrl.$storage.settings.shuttleStatus != 3) $timeout(ctrl.getShuttleInfo, 30000);  
    }

    ctrl.getShuttleInfo();

});
