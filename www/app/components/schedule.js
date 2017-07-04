"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;
    
    this.personal = shared.settings.personalEventView;

    this.$storage = $localStorage;
    this.starred = shared.settings.starredEvents;
    //TODO refresh after api update
    this.schedule = shared.data.schedule;

    this.title = $state.current.title;


    this.personalFilter = function(session) {
        return !ctrl.personal || ctrl.starred[session.id];
    }

    this.persist = function() {
        shared.settings.personalEventView = this.personal;
        shared.persist();
    }

    this.getSpeakerById = shared.getSpeakerById;
    
});
