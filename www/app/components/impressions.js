"use strict";

angular.module("ngapp").controller("ImpressionsController", function(shared, $state, $scope, $http, $mdToast, $mdDialog, $mdComponentRegistry){

    var ctrl = this;
    this.photoList;

    this.showPhoto = function ($event, myPhoto) {

        $mdDialog.show({
            locals: {photo: myPhoto},            
            controller: DialogController,
            templateUrl: 'app/components/impressions.detail.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false
        });        
    }

    function DialogController($scope, $mdDialog, photo) {
        $scope.photo = photo;
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        }; 

        $scope.share = function () {
            var options = {
                files: ['https://ebs.api.nubenum.de/res/impressions/full/'+$scope.photo+'.jpg']
            }

            var onSuccess = function(result) {
                
            }

            var onError = function(msg) {
                
                
            }
            console.log('sharing');
            window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
        }
    }

    this.getImpressions = function () {
      $http({method: 'GET',url: shared.apiSrv+'impressions.json'})
      .then(function successCallback(response) {
        ctrl.photoList = response.data;
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
