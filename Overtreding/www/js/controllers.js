/**
* Created by MartinDzhonov on 6/1/15.
*/

angular.module('starter.controllers', [])

.controller("ConfigController", function($scope, $ionicLoading, $cordovaSQLite, $location, $http,Offenses, $ionicPopup){

    if(window.cordova) {
        $ionicLoading.show({
          template: 'Loading...'
        });
        var db = null;
        $scope.items = [];

        $http.get('http://localhost/overtreding_api/v1/db').then(function(resp) {
            db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
            db.transaction(function (tx) {
                tx.executeSql("DROP TABLE IF EXISTS Texts");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Texts(id integer primary key, body text)");
                tx.executeSql("DROP TABLE IF EXISTS Rights");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Rights(id integer primary key, type integer, body text)");
                tx.executeSql("DROP TABLE IF EXISTS Alchohol");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Alchohol(id integer primary key, intoxication integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Drugs");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Drugs(id integer primary key, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Speed");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Speed(id integer primary key, exceed integer, road integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            });

            var items = resp.data.texts;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
            }

            var items = resp.data.rights;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                var type = items[i].type;
                $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
            }

            var items = resp.data.alcohol;
            for(var i = 0; i < items.length; i++){
                var intoxication = items[i].intoxication;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.drugs;
            for(var i = 0; i < items.length; i++){
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Drugs (text_id_1,text_id_2,text_id_3) VALUES (?,?,?)", [text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.speed;
            for(var i = 0; i < items.length; i++){
                var exceed = items[i].exceed;
                var road = items[i].road;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
            }

            $scope.succ = resp.statusText;
            $scope.log = items.length;
            $ionicLoading.hide();

        }, function(err) {
            console.error('ERR', err);
        });
    }

    $scope.doStuff = function() {

    };
})

.controller("HomeController", function($scope, $ionicPlatform, $cordovaSQLite, $http){
    $scope.items = [];
    // db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    // $ionicPlatform.ready(function(){
    //     var query = "SELECT * FROM Texts a INNER JOIN Speed b ON a.id=b.text_id_1 OR a.id = b.text_id_2 OR a.id = b.text_id_3 WHERE b.exceed = ? AND b.road = ?";
    //     $cordovaSQLite.execute(db, query, [0,0]).then(function(res){
    //         if(res.rows.length > 0){
    //             for(var i = 0; i < res.rows.length; i++){
    //                 $scope.items.push({id: res.rows.item(i).body });
    //             }
    //         }
    //     }, function(err){
    //         console.error(err);
    //     });
    // });
})

.controller("RightsController", function($scope, Rights) {
    $scope.items = Rights.alchRights();

    $scope.showAlch = function() {
        $scope.items = [];
        $scope.items = Rights.alchRights();
    };

    $scope.showDrugs = function() {
        $scope.items = [];
        $scope.items = Rights.drugRights();
    };
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

.controller("CalcFineController", function($scope,  $ionicPopup, Offenses, Questions, $location) {
    var offense = null;
    var currentType = null;
    $scope.menu = Questions.getMenu();

    $scope.menuItemTapped = function(menuItem){
        offense = Offenses.createDefault(menuItem);
        var groupNames =[];
        var subgroups = [];
        var questionsArr = Questions.getQuestions(menuItem);
        groupNames = questionsArr[0];
        subgroups = questionsArr[1];
        $scope.groups = [];

        for (var i=0; i<groupNames.length; i++) {
            $scope.groups[i] = {
                id: i,
                name: groupNames[i],
                items: []
            };
            for (var j=0; j<subgroups[i].length; j++) {
                $scope.groups[i].items.push(subgroups[i][j]);
            }
        }
    };

    $scope.subgroupTapped = function(item, group, index) {
        $scope.groups[group.id].name =  item;
        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
        offense[fieldName] = index;
        if(offense["type"] == "Speed"){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = 98;//speed driven
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = 92;//corrected speed
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
        $location.path("/result");
    };

    $scope.addOffense = function(){
        $scope.groups = [];
        Offenses.add(offense);
        $scope.offenses = Offenses.all();
    }
})

.controller("ResultController", function($scope, $ionicPopup, Offenses) {
    $scope.items = Offenses.all();
})

.controller("ResultDetailController", function($scope,$stateParams, $ionicPopup, Offenses, ResultTexts) {
    var offense = Offenses.findById($stateParams.offenseId);
    $scope.items = [];
    $scope.items = ResultTexts.getTexts(offense);
});
