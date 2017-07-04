"use strict";

angular.module("ngapp").controller("MainController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.views = [
        {id: 'main', title: 'Home', icon: 'home'},
        {id: 'schedule', title: 'Schedule', icon: 'schedule'},
        {id: 'speakers', title: 'Speakers', icon: 'people'},
        {id: 'shuttle', title: 'Shuttle', icon: 'directions_bus'},
        {id: 'news', title: 'News', icon: 'feedback'},
        {id: 'fb', title: 'Facebook', icon: 'img/fb.svg'},
        {id: 'about', title: 'About', icon: 'info_outline'},
    ];


    this.title = $state.current.title;
});
