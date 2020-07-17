"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage", "ngMap", "dcbImgFallback" ])

.run(function(shared, $rootScope, $cordovaDevice, $cordovaStatusbar, $localStorage, $state, $mdDialog, $transitions){
  
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false);
    $cordovaStatusbar.styleHex('#003d78');
    //window.plugins.orientationLock.lock("portrait");

    window.FirebasePlugin.grantPermission();

    window.FirebasePlugin.hasPermission(function(hasPermission){
      console.log(hasPermission);
      if (hasPermission) {
        if ($localStorage.settings.pushNews == undefined) {
            $localStorage.settings.pushNews = true;
            window.FirebasePlugin.subscribe("news");
        }
        if ($localStorage.settings.reminders == undefined) {
            $localStorage.settings.reminders = true;
        }
      }
    }); 

    window.FirebasePlugin.onTokenRefresh(function(token) {
        $localStorage.settings.fcmt = token;
        console.log('fcmt', $localStorage.settings.fcmt);
        
    }, function(error) {
        console.error(error);
    });

 

    window.FirebasePlugin.onMessageReceived(function(notification) {
        console.log(JSON.stringify(notification));
        shared.updateData(true);
        var action = 'news'; 
        if (notification && notification.type) {
            action = notification.type;
        }
        var confirm = $mdDialog.confirm()
        .title((action == 'personal' ? 'Reminder' : 'New message'))
        .textContent((action == 'personal' ? 'Do you want to view your schedule?' : 'You have received a new message.'))
        .ariaLabel('News')
        .ok((action == 'personal' ? 'View schedule' : 'View news'))
        .cancel('Close');
      
        $mdDialog.show(confirm).then(function() {
          $state.transitionTo(action);
        }, function() {
        
        });
        
    }, function(error) {
        console.error(error);
    });
  }, false);


  $transitions.onStart({ }, function(trans) {
      console.log('nav');
    
      if (angular.element(document.body).hasClass('md-dialog-is-showing')) {
        $mdDialog.cancel();
        //return false;
      }
      shared.updateData();
  });
    
})

.config(function($mdThemingProvider, $mdGestureProvider) {
  $mdGestureProvider.skipClickHijack();

  $mdThemingProvider.definePalette('ebsprimary', {
    '50': 'e0eaf1',
    '100': 'b3cadc',
    '200': '80a7c5',
    '300': '4d83ae',
    '400': '26699c',
    '500': '004e8b',
    '600': '004783',
    '700': '003d78',
    '800': '00356e',
    '900': '00255b',
    'A100': '8cafff',
    'A200': '598cff',
    'A400': '2669ff',
    'A700': '0d57ff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      'A100',
      'A200'
    ],
    'contrastLightColors': [
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A400',
      'A700'
    ]
  });
  $mdThemingProvider.definePalette('ebsaccent', {
    '50': 'fff9e0',
    '100': 'fff0b3',
    '200': 'ffe680',
    '300': 'ffdb4d',
    '400': 'ffd426',
    '500': 'ffcc00',
    '600': 'ffc700',
    '700': 'ffc000',
    '800': 'ffb900',
    '900': 'ffad00',
    'A100': 'ffd426',
    'A200': 'ffcc00',
    'A400': 'ffc700',
    'A700': 'ffc000',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A100',
      'A200',
      'A400',
      'A700'
    ],
    'contrastLightColors': []
  });

  $mdThemingProvider.definePalette('ebswarn', {
    '50': 'f6e1e1',
    '100': 'e8b5b3',
    '200': 'd98381',
    '300': 'c9514e',
    '400': 'be2c28',
    '500': 'b20702',
    '600': 'ab0602',
    '700': 'a20501',
    '800': '990401',
    '900': '8a0201',
    'A100': 'ffb6b6',
    'A200': 'ff8383',
    'A400': 'ff5050',
    'A700': 'ff3636',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': [
      '50',
      '100',
      '200',
      'A100',
      'A200',
      'A400'
    ],
    'contrastLightColors': [
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
      'A700'
    ]
  });
  $mdThemingProvider.theme('default')
      .primaryPalette('ebsprimary')
      .accentPalette('ebsaccent')
      .warnPalette('ebswarn');


});
