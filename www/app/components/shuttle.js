"use strict";

angular.module("ngapp").controller("ShuttleController", function(shared, NgMap, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;
    this.$storage = $localStorage;
    this.title = $state.current.title;
    this.getObjectById = shared.getObjectById;
    this.requestShuttle = shared.requestShuttle;

    
    this.cancelShuttle = function () {
        
      $http({method: 'GET',url: 'https://ebs.api.nubenum.de/v1/shuttle.php?do=cancel&location='+ctrl.$storage.settings.shuttleRequestedTo+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        //ctrl.$storage.settings.shuttleRequestedTo = location.id;
        //ctrl.$state.transitionTo('shuttle');
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. Please try again.')
            .hideDelay(5000)
        );
      });       
    }

});
