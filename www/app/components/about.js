"use strict";

angular.module("ngapp").controller("AboutController", function(shared, $state, $scope, $mdComponentRegistry){

    var ctrl = this;

    this.testingIncr = 0;
    this.testing = function() {
        this.testingIncr++;
        if (this.testingIncr == 3) {
            shared.testMode = true;
            alert('You are in test mode now. Restart the app to get back to normal mode.');
        }
    }


    this.title = $state.current.title;
});
