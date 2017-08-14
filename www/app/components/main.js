"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.isUpdateRequired = function () { return shared.updateRequired; }

    this.views = [
        {id: 'personal', title: 'My Schedule', icon: 'perm_contact_calendar'},
        {id: 'schedule', title: 'Speeches & Panels', icon: 'event'},
        {id: 'speakers', title: 'Speakers', icon: 'people'},
        {id: 'partners', title: 'Sponsors & Partners', icon: 'business'},
        {id: 'shuttle', title: 'Shuttle', icon: 'directions_bus'},
        {id: 'news', title: 'News', icon: 'feedback'},
        {id: 'impressions', title: 'Photo Wall', icon: 'photo_camera'}
    ];


    this.title = $state.current.title;

    $scope.$back = function() { 
        window.history.back();
    };
});
