var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova']).constant('ApiEndpoint', {url: 'http://localhost:8100/api'});

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
      })
      .state("contact", {
          url:"/contact",
          templateUrl: "templates/contact.html",
          controller: "ContactController"
      })
      .state("result", {
          url:"/result",
          templateUrl: "templates/result.html",
          controller: "ResultController"
      })
      .state("result-detail", {
          url:"/result/:offenseId",
          templateUrl: "templates/result-detail.html",
          controller: "ResultDetailController"
      });
    $urlRouterProvider.otherwise("/config");
});
