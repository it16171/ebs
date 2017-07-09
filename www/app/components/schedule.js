"use strict";

angular.module("ngapp").controller("ScheduleController", function(shared, $state, $scope, $localStorage, $mdDialog, $mdComponentRegistry, $http, $location){

    var ctrl = this;

    this.$storage = $localStorage;
    this.s = this.$storage.settings;

    this.title = $state.current.title;

    this.days = [
        {"id":28, "title":"Thu 28th"},
        {"id":29, "title":"Fri 29th"},
        {"id":30, "title":"Sat 30th"},
    ];


    this.personalFilter = function(session) {
        return !ctrl.$storage.settings.personalEventsView || ctrl.$storage.settings.starredEvents && ctrl.$storage.settings.starredEvents[session.id];
    }

    this.getSpeakerById = function (speakerId) {
        return shared.getObjectById(speakerId, ctrl.$storage.data.speakers);
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

            $http({method: 'GET',url: shared.apiSrv+'/v1/rate.php?do=rate&session='+$scope.session.id+'&rating='+$scope.starRating+'&fcmt='+shared.getUniqueToken()})
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


    this.showSpeaker = function($event, mySpeaker) {
        //$location.hash("dialog");
        $mdDialog.show({
            locals: {speaker: mySpeaker},
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
