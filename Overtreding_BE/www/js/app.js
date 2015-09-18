var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngAnimate']);

app.run(function($ionicPlatform, $cordovaSQLite, $cordovaFile) {
    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            // cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        window.addEventListener('native.keyboardshow', function(){
  document.body.classList.add('keyboard-open');
});
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
        db = window.openDatabase("test3", "1.0", "Test DB", 1000000);
        // var successFn = function(sql, count){
        //     console.log("Exported SQL: "+sql);
        //     alert("Exported SQL contains "+count+" statements");
        // };
        // cordova.plugins.sqlitePorter.exportDbToSql(db, {
        //     successFn: successFn
        // });
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            var pathOfFileToReadFrom = "OvertredingDB.txt";
            var request = new XMLHttpRequest();
            request.open("GET", pathOfFileToReadFrom, false);
            request.send(null);
            var returnValue = request.responseText;
            var sql = returnValue;
            var successFn = function(count){
                console.log("Successfully imported "+count+" SQL statements to DB");
            };
            var errorFn = function(error){
                console.log("The following error occurred: "+error.message);
            };
            var progressFn = function(current, total){
            };
            cordova.plugins.sqlitePorter.importSqlToDb(db, sql, {
                successFn: successFn,
                errorFn: errorFn,
                progressFn: progressFn
            });
        }
        else {
            console.log('The File APIs are not fully supported in this browser.');
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
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);
});
app.filter('boldKeyWords', function($sce) {
    return function(input) {
        if (! input) return;
        var keyWords = ["alco-sensor", "alcoholcontrole", "ademanalyse", "bloedproef", "uiterlijk", "speekseltest"];
        for (var i = 0; i < keyWords.length; i++) {
            if(input.indexOf(keyWords[i]) != -1){
                return $sce.trustAsHtml("<b>ASDASDAS</b>");
            }
        }

        return input;
    };
});
app.directive('htmlSafe', function($parse, $sce) {
    return {
      link: function(scope, elem, attr) {
        var html = attr.ngBindHtml;
        if(angular.isDefined(html)) {
          var getter = $parse(html);
          var setter = getter.assign;
          setter(scope, $sce.trustAsHtml(getter(scope)));
        }
      }
    };
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
    };
}]);
app.directive('keyFocus', function($ionicPopup) {
    return {
        restrict: 'A',
        link: function($scope, element) {
            element.bind('keydown', function (e) {
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
            });
        }
    };
});
// app.filter('strLimit', ['$filter', function($filter, $ionicPlatform) {
//    return function(input, limit) {
//       if (! input) return;
//       var isIPad = ionic.Platform.isIPad();
//       if(isIPad){
//           limit = 50;
//       }
//       if (input.length <= limit) {
//           return input;
//       }
//
//       return $filter('limitTo')(input, limit) + '...';
//    };
// }]);
