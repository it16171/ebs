"use strict";

angular.module("ngapp", [ "ui.router", "ngMaterial", "ngCordova", "ngStorage", "ngMap" ])
// ngTouch is No Longer Supported by Angular-Material

.run(function($rootScope, $cordovaDevice, $cordovaStatusbar){
  document.addEventListener("deviceready", function () {
    $cordovaStatusbar.overlaysWebView(false); // Always Show Status Bar
    $cordovaStatusbar.styleHex('#003d78'); // Status Bar With Red Color, Using Angular-Material Style
    window.plugins.orientationLock.lock("portrait");
  }, false);
  /* Hijack Android Back Button (You Can Set Different Functions for Each View by Checking the $state.current)
  document.addEventListener("backbutton", function (e) {
      if($state.is('init')){
        navigator.app.exitApp();
      }  else{
        e.preventDefault();
      }
    }, false);*/

    
})

.config(function($mdThemingProvider, $mdGestureProvider) { // Angular-Material Color Theming
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
  $mdThemingProvider.theme('default')
      .primaryPalette('ebsprimary')
      .accentPalette('ebsaccent');


});
