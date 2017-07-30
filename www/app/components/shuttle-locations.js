"use strict";

angular.module("ngapp").controller("ShuttleLocationsController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry, $mdToast, $http, $compile){

    var ctrl = this;
    this.$storage = $localStorage;
    

    mapboxgl.accessToken = 'none';
    this.glControls = {
      navigation: {
        enabled: true,
        options: {
          position: 'top-right'
        }
      }
    };

    function createElement (isCenter) {
      var element = document.createElement('div');
      element.className = "material-icons map-marker";
      element.innerHTML = "location_on";
      if (isCenter) element.style.color = '#004e8b';
      return element;
    }

    this.glMarkers = [{
      coordinates: [8.0504839,50.0121135],
      element: createElement(true),
      options: {
        offset: [0, -15]
      },
      popup: {
        enabled: true,
        message: 'EBS Symposium',
        options: {
          offset: 25
        }
      }
    }];   
    var markers = this.$storage.data.pickupLocations;
    for(var i = 0;i<markers.length;i++) {
      var compiled = $compile('<md-button onclick="requestShuttleProxy(\''+markers[i].id+'\')">Request here</md-button>')($scope);
      this.glMarkers.push({
        coordinates: [markers[i].lon,markers[i].lat],
        element: createElement(),
        options: {
          offset: [0, -15]
        },
        popup: {
          enabled: true,
          message: markers[i].name,
          options: {
            offset: 25
          }
        }
      });
    }
 
    this.requestShuttle = function (locationId) {
    
      $http({method: 'GET',url: shared.apiSrv+'shuttle.php?do=request&location='+locationId+'&fcmt='+shared.getUniqueToken()})
      .then(function successCallback(response) {
        ctrl.$storage.settings.shuttleRequestedTo = locationId;
        ctrl.$storage.settings.shuttleStatus = response.data.status;
        $state.transitionTo('shuttle');
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. Please try again.')
            .hideDelay(5000)
        );
      });       
    }


  

    this.title = $state.current.title;
});
