var app = angular.module('starter', ['ionic', 'starter.controllers', , 'starter.services', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
      .state("config", {
        url:"/config",
        templateUrl: "templates/config.html",
        controller: "ConfigController"
      })
      .state("home", {
        url:"/home",
        templateUrl: "templates/home.html",
        controller: "HomeController"
      })
      .state("rights", {
          url:"/rights",
          templateUrl: "templates/rights.html",
          controller: "RightsController"
      })
      .state("alcohol", {
          url:"/alcohol",
          templateUrl: "templates/alcohol.html",
          controller: "AlcoholController"
      });
    $urlRouterProvider.otherwise("/config");
});
