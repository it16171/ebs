"use strict";

angular.module("ngapp").controller("ImpressionsController", function(shared, $state, $scope, $http, $mdToast, $mdDialog, $mdComponentRegistry){

    var ctrl = this;
    this.impressionsNum = 0;
    this.selectedPhoto = -1;

    this.range = function(n) {
        return new Array(n);
    };

    this.showPhoto = function ($event, myId) {

        ctrl.selectedPhoto = myId;       
        $mdDialog.show({
            contentElement: '#projector',
            parent: angular.element(document.body),
            controller: DialogController,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        });        
    }

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
            ctrl.selectedPhoto = -1;
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.share = function () {
            var options = {
                files: ['https://ebs.api.nubenum.de/res/impressions/full/'+ctrl.selectedPhoto+'.jpg']
            }

            var onSuccess = function(result) {
                
            }

            var onError = function(msg) {
                
            }

            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }
    }

    this.getImpressions = function () {
      $http({method: 'GET',url: shared.apiSrv+'/v1/impressions.json'})
      .then(function successCallback(response) {
        ctrl.impressionsNum = response.data.impressionsNum;
        console.log(ctrl.range(ctrl.impressionsNum));
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
