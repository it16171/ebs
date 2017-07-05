"use strict";

angular.module("ngapp").controller("SpeakersController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;

    this.$storage = $localStorage

    this.title = $state.current.title;
    this.speakerId = $state.params.speakerId;
});
