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
        //http://localhost/overtreding_api/v1/db
        //'http://www.martindzhonov.podserver.info/overtreding_api/v1/db'
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
                tx.executeSql("DROP TABLE IF EXISTS Other");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Other(id integer primary key, degree integer, description text, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
                tx.executeSql("DROP TABLE IF EXISTS Other_Tags");
                tx.executeSql("CREATE TABLE IF NOT EXISTS Other_Tags(tag_name text, offense_id integer)");
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
            var items = resp.data.speed;
            for(var i = 0; i < items.length; i++){
                var exceed = items[i].exceed;
                var road = items[i].road;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
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

            var items = resp.data.other;
            for(var i = 0; i < items.length; i++){
                var degree = items[i].degree;
                var description = items[i].description;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Other (degree, description, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [degree, description, text_id_1, text_id_2, text_id_3]);
            }

            var items = resp.data.other_tags;
            for(var i = 0; i < items.length; i++){
                var tag_name = items[i].tag_name;
                var offense_id = items[i].offense_id;
                $cordovaSQLite.execute(db, "INSERT INTO Other_Tags (tag_name, offense_id) VALUES (?,?)", [tag_name, offense_id]);
            }
            $scope.succ = resp.statusText;
            $scope.log = items.length;
            $ionicLoading.hide();

        }, function(err) {
            console.error('ERR', err);
        });
    }
})

.controller("HomeController", function($scope, $ionicPlatform, $cordovaSQLite, $http){
    $scope.items = [];
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

.controller("CalcFineController", function($scope, $ionicPopup, Offenses, Questions, $location) {
    var offense = null;
    $scope.offenses = [];
    $scope.items = [];
    $scope.inputs = {};
    $scope.menu = Questions.getMenu();
    $scope.offenses.push({type: ""});

    $scope.menuItemTapped = function(menuItem){

        $scope.menu = [];
        offense = Offenses.createDefault(menuItem);
        $scope.offenses.splice($scope.offenses.length -1,1,{type: offense.type});
        $scope.showSearch = false;
        $scope.showInput = false;

        if(menuItem === "Other"){
            $scope.showInput2 = true;
        }
        if(menuItem === "Speed"){
            $scope.showInput = true;
        }

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

    $scope.addOffense = function(){
        var valid = true;
        if(offense["type"] == "Speed"){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_driven);//speed driven
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_corrected);//corrected speed
        }
        for (var key in offense) {
            if (offense.hasOwnProperty(key)) {
                if(key === "type"){

                }else{
                    if(offense[key] === -1){
                        valid = false;
                    }
                }
            }
        }
        if(valid){
            $scope.groups = [];
            $scope.showInput2 = false;
            $scope.showInput = false;
            Offenses.add(offense);
        }
        else{
            var confirmPopup = $ionicPopup.confirm({
                title: 'Invliad input',
                template: 'Please enter all fields'
            });
            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }
    };

    $scope.createNewOffense = function() {
        $scope.groups = [];
        $scope.showInput2 = false;
        $scope.showInput = false;
        $scope.menu = Questions.getMenu();
        $scope.offenses.push({type: ""});
    };

    $scope.search = function() {
        $scope.items.length = 0;
        $scope.items = Offenses.searchOthers($scope.inputs.searchWord);
    };
    $scope.otherTapped = function(item) {
        offense.id = item.id;
        offense.degree = item.degree;
        offense.age = 1;
        offense.licence = 1;
        var confirmPopup = $ionicPopup.confirm({
            title: 'Invliad input',
            template: 'Please enter all fields'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
            } else {
                console.log('You are not sure');
            }
        });
    };
    $scope.calcSpeed = function() {
        var speedDriven = $scope.inputs.speed_driven;
        if(isNaN(speedDriven)){
            $scope.inputs.speed_corrected = "";
        }
        else{
            speedDriven = parseInt(speedDriven);
            if(speedDriven > 10){
                if(speedDriven <= 100){
                    $scope.inputs.speed_corrected = speedDriven - 6;
                }
                else{
                    $scope.inputs.speed_corrected = Math.floor(speedDriven - 0.06*speedDriven);
                }
            }
            else {
                $scope.inputs.speed_corrected = "";
            }
        }
    };
})

.controller("ResultController", function($scope, $ionicPopup, Offenses) {
    $scope.items = Offenses.all();
})

.controller("ResultDetailController", function($scope,$stateParams, $ionicPopup, Offenses, ResultTexts) {
    var offense = Offenses.findById($stateParams.offenseId);
    var offenseDisplayId = parseInt($stateParams.offenseId) + 1;
    $scope.title = "Overtreding " + offenseDisplayId + " " + offense.type;
    $scope.items = [];
    $scope.items = ResultTexts.getTexts(offense);
});
