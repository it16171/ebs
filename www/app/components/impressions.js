"use strict";

angular.module("ngapp").controller("ImpressionsController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.range = function(n) {
        return new Array(n-1);
    };

 


    this.title = $state.current.title;
});
