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
.controller("SpeedController", function($scope, Rights) {
    var alchohol = {
        Licence: 0,
        Age: 0,
        Driver: 0,
        Intoxication: 0
    };
    $scope.groups = [];
    $scope.items = Rights.alchRights();
    var names = ["2","LEEFTIJD", "BESTRUUDER", "INTOXICATIE"];
    var subgroups = [['Ik bezit mijn rijbewijs minder dan 2 jaar', "Ik bezit mijn rijbewijs langer dan 2 jaar"],
    ["Jonger dan 18 jaar","18 jaar of ouder"],
    ["Professionele bestuurder", "Gewone bestuurder"],
    ["0,50 – 0,80 Promille",
    "0,80 – 1,00 Promille",
    "1,00 – 1,14 Promille",
    "1,14 – 1,48 Promille",
    "1,48 - ... Promille",
    "Weigering ademtest of analyse zonder wettige reden",
    "Dronkenschap",
    "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op alcoholintoxicatie van meerdan 0,8 Promille.",
    "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op dronkenschap"]];

    for (var i=0; i<4; i++) {
        $scope.groups[i] = {
            name: names[i],
            items: []
        };
        for (var j=0; j< subgroups[i].length; j++) {
            $scope.groups[i].items.push(subgroups[i][j]);
        }
    }

    /*
    * if given group is the selected group, deselect it
    * else, select the given group
    */
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
})
.controller("AlcoholController", function($scope,  $ionicPopup) {
    var alchohol = {age:1};
    var names = ["RIJBEWIJS","LEEFTIJD", "BESTRUUDER", "INTOXICATIE"];
    var subgroups = [['Ik bezit mijn rijbewijs minder dan 2 jaar', "Ik bezit mijn rijbewijs langer dan 2 jaar"],
    ["Jonger dan 18 jaar","18 jaar of ouder"],
    ["Professionele bestuurder", "Gewone bestuurder"],
    ["0,50 – 0,80 Promille",
    "0,80 – 1,00 Promille",
    "1,00 – 1,14 Promille",
    "1,14 – 1,48 Promille",
    "1,48 - ... Promille",
    "Weigering ademtest of analyse zonder wettige reden",
    "Dronkenschap",
    "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op alcoholintoxicatie van meerdan 0,8 Promille.",
    "Eerder betrapt op alcoholintoxicatie van meer dan 0,8 Promille of dronkenschap en nu opnieuw betrapt op dronkenschap"]];

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

    $scope.subgroupTapped = function(item, group, index) {
        $scope.groups[group.id].name =  item;
        var confirmPopup = $ionicPopup.confirm({
            title: "subroup:" + index + " " + "group:" + group.id,
            template: 'Send email'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
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
.controller("ResultController", function($scope, Offenses, $ionicPopup) {
    $scope.offenses = Offenses.all();

});
