"use strict";

angular.module("ngapp").controller("SpeakersController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.speakers = shared.data.speakers;

    this.title = $state.current.title;
    this.speakerId = $state.params.speakerId;
});
