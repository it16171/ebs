"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.isUpdateRequired = function () { return shared.updateRequired; }

    this.views = [
        {id: 'personal', title: 'My Schedule', icon: ''},
        {id: 'schedule', title: 'General Schedule', icon: 'event'},
        {id: 'speakers', title: 'Speakers', icon: 'people'},
        {id: 'partners', title: 'Partners & Sponsors', icon: 'business'},
        {id: 'shuttle', title: 'Shuttle', icon: ''},
        {id: 'news', title: 'News', icon: 'feedback'},
        {id: 'impressions', title: 'Photo Wall', icon: ''}
    ];

    


    this.title = $state.current.title;

    $scope.$back = function() { 
        window.history.back();
    };
});
