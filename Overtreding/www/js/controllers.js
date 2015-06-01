/**
 * Created by MartinDzhonov on 6/1/15.
 */

angular.module('starter.controllers', [])

.controller("ConfigController", function($scope, $ionicLoading, $cordovaSQLite, $location, $http){
    if(window.cordova) {
        var db = null;

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
            // err.status will contain the status code
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
            console.error('ERR', err);
            // err.status will contain the status code
        });
    }
})

.controller("HomeController", function($scope, $ionicPlatform, $cordovaSQLite, $http){
        var db = null;

        $scope.items = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    $ionicPlatform.ready(function(){
        var query = "SELECT id, body FROM Texts";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    $scope.items.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
                }
            }
        }, function(err){
            console.error(err);
        });
    });

})

.controller("RightsController", function($scope, $ionicPlatform, $cordovaSQLite, $http) {
        var db = null;

        $scope.items = [];
    db = window.openDatabase("test2", "1.0", "Test DB", 1000000);
    $ionicPlatform.ready(function(){
        var query = "SELECT * from Rights where type = 0";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    $scope.items.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
                }
            }
        }, function(err){
            console.error(err);
        });
    });
    $scope.showAlch = function() {
        $scope.items.length = 0;
        var query = "SELECT * from Rights where type = 0";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    $scope.items.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
                }
            }
        }, function(err){
            console.error(err);
        });
    }
    $scope.showDrugs = function() {
        $scope.items.length = 0;
        var query = "SELECT * from Rights where type = 1";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            if(res.rows.length > 0){
                for(var i = 0; i < res.rows.length; i++){
                    $scope.items.push({id: res.rows.item(i).id, body: res.rows.item(i).body});
                }
            }
        }, function(err){
            console.error(err);
        });
    }
});