"use strict";

angular.module("ngapp").controller("PartnersController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;

    this.$storage = $localStorage;

    this.filters = [
            {"id":"sponsor", "name":"sponsors"},
            {"id":"partner", "name":"partners"},
            {"id":"inno", "name":"inno"},
    ];

    this.title = $state.current.title;
});
