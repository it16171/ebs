"use strict";

angular.module("ngapp").controller("PartnersController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.partners = shared.data.partners;

    this.title = $state.current.title;
});
