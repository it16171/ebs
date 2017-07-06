"use strict";

angular.module("ngapp").controller("ImpressionsController", function(shared, $state, $scope, $http, $mdToast, $mdDialog, $mdComponentRegistry){

    var ctrl = this;
    this.impressionsNum = 0;
    this.selectedPhoto = -1;

    this.range = function(n) {
        return new Array(n);
    };

    this.showPhoto = function (ev, id) {
        return;
        ctrl.selectedPhoto = id;       
        $mdDialog.show({
            contentElement: '#projector',
            parent: angular.element(document.body),
            controller: DialogController,
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: true
        });
        
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

    this.getImpressions = function () {
      $http({method: 'GET',url: shared.apiSrv+'/v1/impressions.json'})
      .then(function successCallback(response) {
        ctrl.impressionsNum = response.data.impressionsNum;
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection.')
            .hideDelay(5000)
        );
      });     
    }
    this.getImpressions();

    this.title = $state.current.title;
});
