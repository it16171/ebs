"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.personal = shared.settings.personalEventView;

    this.starred = shared.settings.starredEvents;

    this.schedule = [
        {id: '1', title: 'How to save the planet', speaker: shared.speakers[4], time: '10:00-11:30', day : 28},
        {id: '2', title: 'A generic speech', speaker: shared.speakers[0], time: '10:00-11:30', day : 28},
        {id: '3', title: 'How to succeed in life', speaker: shared.speakers[7], time: '10:00-11:30', day : 29},
        {id: '4', title: 'What to do next', speaker: shared.speakers[1], time: '10:00-11:30', starred: false, day : 30}
    ];


    this.title = $state.current.title;


    this.personalFilter = function(session) {
        return !ctrl.personal || ctrl.starred[session.id];
    }

    this.persist = function() {
        shared.settings.personalEventView = this.personal;
        shared.persist();
    }
});
