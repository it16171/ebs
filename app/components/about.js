"use strict";

angular.module("ngapp").controller("AboutController", function(shared, $state, $scope, $localStorage, $mdComponentRegistry){

    var ctrl = this;
    this.$storage = $localStorage;
    this.shared = shared;

    

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
            shared.apiSrv = shared.apiSrv.replace('v1', 'test');
            shared.updateData(true);
            alert('You are in test mode now. Restart the app to get back to normal mode.');
        }
    }


    this.title = $state.current.title;
});
