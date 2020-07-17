"use strict";

angular.module("ngapp").controller("SpeakersController", function(shared, $state, $scope, $localStorage, $mdDialog, $mdComponentRegistry){

    var ctrl = this;

    this.$storage = $localStorage

    this.title = $state.current.title;

    this.showSpeaker = function($event, mySpeaker) {
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
