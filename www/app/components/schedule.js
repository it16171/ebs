"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;

    this.$storage = $localStorage;
    this.s = this.$storage.settings;

    this.title = $state.current.title;


    this.personalFilter = function(session) {
        return !ctrl.$storage.settings.personalEventsView || ctrl.$storage.settings.starredEvents && ctrl.$storage.settings.starredEvents[session.id];
    }

    this.getSpeakerById = function (speakerId) {
        return shared.getObjectById(speakerId, ctrl.$storage.data.speakers);
    }
    
});
