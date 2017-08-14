"use strict";

angular.module("ngapp").controller("PersonalController", function(shared, $state, $scope, $localStorage, $mdDialog, $mdComponentRegistry, $http, $location){

    var ctrl = this;

    this.$storage = $localStorage;
    this.s = this.$storage.settings;
    this.shared = shared;

    this.title = $state.current.title;

    this.days = [
        {"id":28, "title":"Thu 28th"},
        {"id":29, "title":"Fri 29th"},
        {"id":30, "title":"Sat 30th"},
    ];

    var date = new Date();
    var day = date.getDate();
    if (day < 28 || day > 30) day = 28;  
    this.today = day-28;

    this.lZ = function(num) {
        return (num<10?'0':'')+num;
    } 
    this.timeCalc = function(start, duration) {
        var parts = start.split(':');
        var newM = parseInt(parts[1])+duration;
        return this.lZ(parseInt(parts[0])+Math.floor(newM/60))+':'+this.lZ(newM%60);
    }
    this.getSessionTimeString = function(start, duration) {
        return start+'-'+this.timeCalc(start, duration);
    }

    this.personalFilter = function(session) {
        return ctrl.$storage.settings.starredEvents && ctrl.$storage.settings.starredEvents[session.id];
    }

    this.getSpeakerById = function (speakerId) {
        var out = shared.getObjectById(speakerId, ctrl.$storage.data.speakers);
        if (!out) out = {"name":speakerId};
        return out;
    }



    this.rateSession = function($event, session) {
        $mdDialog.show({
            locals: {sessionToRate: session},
            contentElement: '#rating',
            parent: angular.element(document.body),
            controller: RateDialogController,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        });        
    }

    function RateDialogController($scope, $mdDialog, sessionToRate) {
        $scope.session = sessionToRate;
        $scope.speakerName = ctrl.getSpeakerById($scope.session.speakers[0]).name;
        $scope.starRating = 0;

        $scope.range = function(n) {
            return new Array(n);
        };

        $scope.setStarRating = function(rating) {
            $scope.starRating = rating;
        }

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.send = function () {

            $http({method: 'GET',url: shared.apiSrv+'rate.php?do=rate&session='+$scope.session.id+'&rating='+$scope.starRating+'&fcmt='+shared.getUniqueToken()})
            .then(function successCallback(response) {
                if (!ctrl.s.ratedSessions) ctrl.s.ratedSessions = [];
                ctrl.s.ratedSessions.push($scope.session.id);
                $scope.hide();
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('It appears that you have no internet connection. Your rating could not be sent.')
                        .hideDelay(5000)
                );
            });       
        }
    }

    this.addInvite = function($event, myType) {
        $mdDialog.show({
            locals: {invites: ctrl.$storage.data.invites, type: myType},
            contentElement: '#invite',
            parent: angular.element(document.body),
            controller: InviteDialogController,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        });        
    }

    function InviteDialogController($scope, $mdDialog, type, invites) {
        $scope.invites = invites;
        $scope.type = type;
      
      

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {

            /*$http({method: 'GET',url: shared.apiSrv+'rate.php?do=rate&session='+$scope.session.id+'&rating='+$scope.starRating+'&fcmt='+shared.getUniqueToken()})
            .then(function successCallback(response) {
                if (!ctrl.s.ratedSessions) ctrl.s.ratedSessions = [];
                ctrl.s.ratedSessions.push($scope.session.id);
                $scope.hide();
            }, function errorCallback(response) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('It appears that you have no internet connection. Your rating could not be sent.')
                        .hideDelay(5000)
                );
            });    */   
        }
    }


    this.showSpeaker = function($event, mySpeaker) {
        //$location.hash("dialog");
        $mdDialog.show({
            locals: {speaker: ctrl.getSpeakerById(mySpeaker)},
            controller: SpeakerDialogController,
            templateUrl: 'app/components/speakers.detail.html',
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose:true,
            fullscreen: false
        });     
    }
    function SpeakerDialogController($scope, $mdDialog, speaker) {
        
        $scope.speaker = speaker;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }
    
});
