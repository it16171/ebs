"use strict";

angular.module("ngapp").controller("AboutController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

 


    this.title = $state.current.title;
});
