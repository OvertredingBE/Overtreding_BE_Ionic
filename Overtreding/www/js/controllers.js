/**
* Created by MartinDzhonov on 6/1/15.
*/

angular.module('starter.controllers', [])

.controller("ConfigController", function($scope, $ionicLoading, $cordovaSQLite, $location, $http,Offenses, $ionicPopup){
    // $http.get('http://localhost/overtreding_api/v1/texts').then(function(resp) {
    //     $scope.succ = resp.statusText;
    //     var items = resp.data.texts;
    //     $scope.log = items.length;
    //     $scope.items = items;
    // }, function(err) {
    //     console.error('ERR', err);
    //     // err.status will contain the status code
    // });
    if(window.cordova) {
        var db = null;
        $scope.items = [];

        $http.get('http://localhost/overtreding_api/v1/texts').then(function(resp) {
            $scope.succ = resp.statusText;
            var items = resp.data.texts;
            $scope.log = items.length;
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS Texts");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Texts(id integer primary key, body text)");
            });

            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
            }
        }, function(err) {
            console.error('ERR', err);
        });

        $http.get('http://localhost/overtreding_api/v1/rights').then(function(resp) {
            $scope.succ = resp.statusText;
            var items = resp.data.rights;
            $scope.items = [];
            $scope.log = items.length;
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS Rights");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Rights(id integer primary key, type integer, body text)");
            });

            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                var type = items[i].type;
                $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
            }
        }, function(err) {
            console.error('ERR', err.status);
        });
        $http.get('http://localhost/overtreding_api/v1/alchohol').then(function(resp) {
            $scope.succ = resp.statusText;
            var items = resp.data.alchohol;
            $scope.log = items.length;
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS Alchohol");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Alchohol(id integer primary key, intoxication integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            });

            for(var i = 0; i < items.length; i++){
                var intoxication = items[i].intoxication;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
            }
        }, function(err) {
            console.error('ERR', err);
        });
    }
    $scope.doStuff = function(){
        var offense = {id:1, body:"YASYDAS"};
        Offenses.add(offense);
    }
})

.controller("HomeController", function($scope, $ionicPlatform, $cordovaSQLite, $http){
    $scope.items = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    $ionicPlatform.ready(function(){
        var query = "SELECT * FROM Texts";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    $scope.items.push({id: res.rows.item(i).body});
                }
            }
        }, function(err){
            console.error(err);
        });
    });
})

.controller("RightsController", function($scope, Rights) {
    $scope.items = Rights.alchRights();

    $scope.showAlch = function() {
        $scope.items = [];
        $scope.items = Rights.alchRights();
    }
    $scope.showDrugs = function() {
        $scope.items = [];
        $scope.items = Rights.drugRights();
    }
})
.controller("DashCtrl", function($scope, Rights) {
    $scope.items = Rights.alchRights();

    $scope.showAlch = function() {
        $scope.items = [];
        $scope.items = Rights.alchRights();
    }
    $scope.showDrugs = function() {
        $scope.items = [];
        $scope.items = Rights.drugRights();
    }
})
.controller("ContactController", function($scope, Rights, $ionicPopup) {
    $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'This is a popup',
            template: 'Send email ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };

})
.controller("AlcoholController", function($scope,  $ionicPopup, Offenses, Questions, $location) {
    var offense = {licence: -1,
        age:-1,
        driver:-1,
        intoxication:-1,
        type:"Alchohol"};
        $scope.menu = Questions.getMenu();

        $scope.subgroupTapped = function(item, group, index) {
            $scope.groups[group.id].name =  item;

            switch (group.id) {
                case 0:
                offense.licence = index;
                break;
                case 1:
                offense.age = index;
                break;
                case 2:
                offense.driver = index;
                break;
                case 3:
                offense.intoxication = index;
                break;
                default:
            }
        };
        $scope.toggleGroup = function(group) {

            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };
        $scope.doStuff = function(){
            Offenses.add(offense);
            $location.path("/result");
        }
        $scope.menuItemTapped = function(menuItem){
            var names =[];// ["RIJBEWIJS","LEEFTIJD", "BESTRUUDER", "INTOXICATIE"];
            var subgroups = [];

            switch (menuItem) {
                case "Alchohol":
                var groups = Questions.getQuestions();
                names = groups[0];
                subgroups = groups[1];
                break;
                default:
            }
            $scope.groups = [];
            for (var i=0; i<names.length; i++) {
                $scope.groups[i] = {
                    id: i,
                    name: names[i],
                    items: []
                };
                for (var j=0; j<subgroups[i].length; j++) {
                    $scope.groups[i].items.push(subgroups[i][j]);
                }
            }

        }

    })
    .controller("ResultController", function($scope, $ionicPopup, Offenses) {
        $scope.items = Offenses.all();
    })
    .controller("ResultDetailController", function($scope,$stateParams, $ionicPopup, Offenses, ResultTexts) {
        var offense = Offenses.findById($stateParams.offenseId);
        $scope.items = ResultTexts.getTexts(offense);
    });
