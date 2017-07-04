"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.title = $state.current.title;
});
