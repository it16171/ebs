"use strict";

angular.module("ngapp").controller("NewsController", function(shared, $state, $scope, $localStorage, $http, $mdToast, $mdComponentRegistry){

    var ctrl = this;
    this.title = $state.current.title;
    this.$storage = $localStorage;

    this.subscribe = function() {
        document.addEventListener("deviceready", function () {
            if (ctrl.$storage.settings.pushNews) {
                console.log('enable push');         
                window.FirebasePlugin.grantPermission();
                window.FirebasePlugin.hasPermission(function(data){
                    console.log(data.isEnabled);
                    if (!data.isEnabled) {
                        ctrl.$storage.settings.pushNews = false;
                    } else {
                        window.FirebasePlugin.subscribe("news");
                    }
                });        
            } else {
                console.log('disable push');
                window.FirebasePlugin.unsubscribe("news");
            }
        }, false);
    }

    this.getNews = function () {
      $http({method: 'GET',url: shared.apiSrv+'/v1/news.json'})
      .then(function successCallback(response) {
            console.log('news updated');
            ctrl.$storage.news = response.data;
      }, function errorCallback(response) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('It appears that you have no internet connection. The news can\'t be updated.')
            .hideDelay(5000)
        );
      });     
    }

    this.getNews();

});
