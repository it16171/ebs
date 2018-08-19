"use strict";

angular.module("ngapp").controller("PartnersController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;

    this.$storage = $localStorage;
    this.title = $state.current.title;
});
