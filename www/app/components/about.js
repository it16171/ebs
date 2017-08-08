"use strict";

angular.module("ngapp").controller("AboutController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;
    this.$storage = $localStorage;
    this.shared = shared;

    this.toggleNews = function() {
        document.addEventListener("deviceready", function () {
            if (ctrl.$storage.settings.pushNews) {
                console.log('enable push');         
                window.FirebasePlugin.grantPermission();
                window.FirebasePlugin.hasPermission(function(data){
                    console.log(data.isEnabled);
                    if (!data.isEnabled) {
                        ctrl.$storage.settings.pushNews = false;
                    } else {
                        window.FirebasePlugin.subscribe("news");
                    }
                });        
            } else {
                console.log('disable push');
                window.FirebasePlugin.unsubscribe("news");
            }
        }, false);
    }

    this.toggleReminders = function() {

        document.addEventListener("deviceready", function () {
            if (ctrl.$storage.settings.reminders) {
                console.log('enable reminders');         
                window.FirebasePlugin.grantPermission();
                window.FirebasePlugin.hasPermission(function(data){
                    console.log(data.isEnabled);
                    if (!data.isEnabled) {
                        ctrl.$storage.settings.reminders = false;
                    } else {
                        ctrl.shared.updateData(true);
                    }
                });        
            } else {
                console.log('disable reminders');     
                ctrl.shared.updateData(true);           
            }
            
        }, false);

    }

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
