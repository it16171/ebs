"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $mdSidenav, $mdComponentRegistry){

    var ctrl = this;

    this.schedule = [
        {id: 'main', title: 'How to save the planet', speaker: shared.speakers[4], time: '10:00-11:30', starred: false}
    ];


    this.title = $state.current.title;
});
