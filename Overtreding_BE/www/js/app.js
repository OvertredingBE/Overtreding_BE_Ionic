var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngAnimate']);

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

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $compileProvider){
    if (!ionic.Platform.isIOS()) {
   $ionicConfigProvider.scrolling.jsScrolling(false);
    }
    $stateProvider
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
    .state("calc-fine", {
        url:"/calc-fine",
        templateUrl: "templates/calc-fine.html",
        controller: "CalcFineController"
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
    })
    .state("contact", {
        url:"/contact",
        templateUrl: "templates/contact.html",
        controller: "ContactController"
    })
    .state("takepic", {
        url:"/takepic",
        templateUrl: "templates/takepic.html",
        controller: "TakePictureController"
    });
    $urlRouterProvider.otherwise("/home");
    $ionicConfigProvider.navBar.alignTitle('center');
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
});
app.filter('translateToDutch', ['TranslateService', function(TranslateService) {
   return function(input) {
      if (! input) return;
      return TranslateService.englishToDutch(input);
   };
}]);

app.filter('zipCodeTranslate', ['ZipCodes', function(ZipCodes) {
   return function(input) {
      if (! input) return;
      return ZipCodes.getNameForZipCode(input);
      if (input.length <= 5) {
          return input;
      }
   };
}]);
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.directive('keyFocus', function($ionicPopup) {
  return {
    restrict: 'A',
    link: function($scope, element) {
      element.bind('keydown', function (e) {
          // up arrow
        if (e.keyCode == 13) {
            var $nextElement = element.next().next();
                if($nextElement.length) {
                    $nextElement[0].focus();
                }
                else{
                    document.activeElement.blur();
                    $("input").blur();
                }

        }
        // // down arrow
        // else if (e.keyCode == 66) {
        //   if(!scope.$last) {
        //     elem[0].nextElementSibling.focus();
        //   }
        // }
      });
    }
  };
});
app.filter('strLimit', ['$filter', function($filter, $ionicPlatform) {
   return function(input, limit) {
      if (! input) return;
      var isIPad = ionic.Platform.isIPad();
      if(isIPad){
          limit = 50;
      }
      if (input.length <= limit) {
          return input;
      }

      return $filter('limitTo')(input, limit) + '...';
   };
}]);
