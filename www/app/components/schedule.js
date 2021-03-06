"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $localStorage, $mdDialog, $mdToast, $mdComponentRegistry, $http, $location){

    var ctrl = this;

    this.isPersonal = ($state.current.name == 'personal');

    this.$storage = $localStorage;
    this.s = this.$storage.settings;
    this.shared = shared;

    this.title = $state.current.title;

    this.typeColors = this.$storage.data.scheduleTypeColors;

    this.getTypeName = function(session) {
        if (session.type == 'panel') return 'Panel Discussion';
        if (session.type == 'presentation') return 'Company Presentation';
        return session.type.replace('-', ' ');
    }

    var date = new Date();
    var day = date.getDate();
    var firstDay = this.$storage.data.days[0].id;
    var lastDay = this.$storage.data.days[this.$storage.data.days.length-1].id;
    if (day < firstDay || day > lastDay) day = firstDay;  
    this.today = day-firstDay;

    this.lZ = function(num) {
        return (num<10?'0':'')+num;
    } 
    this.timeCalc = function(start, duration) {
        var parts = start.split(':');
        var newM = parseInt(parts[1])+duration;
        return this.lZ(parseInt(parts[0])+Math.floor(newM/60))+':'+this.lZ(newM%60);
    }
    this.getSessionTimeString = function(start, duration) {
        if (duration == 0) return start;
        return start+'-'+this.timeCalc(start, duration);
    }

    this.personalFilter = function(session) {
        if (session.type == 'interview' && ctrl.s.starredEvents) session.start = ctrl.s.starredEvents[session.id];
        return !ctrl.isPersonal || session.type == 'generic' || ctrl.$storage.settings.starredEvents && ctrl.$storage.settings.starredEvents[session.id];
    }

    this.getSpeakerById = function (speakerId) {
        var out = shared.getObjectById(speakerId, ctrl.$storage.data.speakers);
        if (!out) out = {"name":speakerId};
        return out;
    }

    this.rateSession = function($event, session) {
        $mdDialog.show({
            locals: {sessionToRate: session},
            contentElement: '#rating-dialog',
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

    this.addInvite = function($event, myType, myTabDay) {
        $mdDialog.show({
            locals: {invites: ctrl.$storage.data.invites, type: myType, tabDay: myTabDay},
            contentElement: '#invite-dialog',
            parent: angular.element(document.body),
            controller: InviteDialogController,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        });        
    }

    function InviteDialogController($scope, $mdDialog, type, invites, tabDay) {
        $scope.invites = invites;
        $scope.type = type;
        $scope.selectedCompany = null;
        $scope.selectedHour = null;
        $scope.selectedMinute = null;
        $scope.selectedDay = tabDay;
      

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            console.log($scope.selectedHour, $scope.selectedMinute);
            var truth = true;
            if ($scope.type == 'interview') truth = $scope.selectedHour + ':' + $scope.selectedMinute;
            ctrl.$storage.settings.starredEvents[$scope.selectedCompany] = truth;

            ctrl.shared.updateData(true); 
            $scope.hide();
        }
    }

    this.showSpeaker = function($event, mySpeaker) {
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

    this.showDetail = function($event, mySession) {
        $mdDialog.show({
            locals: {session: mySession},
            contentElement: '#detail-dialog',
            parent: angular.element(document.body),
            controller: DetailDialogController,
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false,
            scope: $scope,
            preserveScope: true
        });     
    }
  
    function DetailDialogController($scope, $mdDialog, session) {
        
        $scope.session = session;
        $scope.hide = function() {
            $mdDialog.hide();
        };
    }
    
});
