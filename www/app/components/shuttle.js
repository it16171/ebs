"use strict";

angular.module("ngapp").controller("ShuttleController", function(shared, NgMap, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;
    this.title = $state.current.title;
});
