/**
* Created by MartinDzhonov on 6/1/15.
*/

angular.module('starter.controllers', [])

.controller("ConfigController", function($scope, $ionicPlatform, $ionicLoading, $cordovaSQLite, $http, $ionicPopup){
    $scope.title = "ConfigCntlr";
    $ionicPlatform.ready(function() {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var db = null;
        $scope.items = [];
        var url = 'http://www.martindzhonov.podserver.info/overtreding_api/v1/db';
        // var url = 'http://localhost/overtreding_api/v1/db';

        $http.get(url).then(function(resp) {
            console.log("Fetching database");
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
            console.log("Database populated.");

        }, function(err) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.confirm({
                title: 'Error',
                template: "Could not connect to server"
            });
            console.error(err);
        });
    });
})

.controller("HomeController", function($scope, $ionicPlatform, $ionicHistory, Offenses){
    Offenses.clear();
    $scope.goBack = function() {
        $ionicHistory.goBack();  // This takes you back to the last view state.
    }
})

.controller("RightsController", function($scope, $ionicHistory, Rights) {
    $scope.items = Rights.alchRights();
    $scope.last = "item-underline";

    $scope.showAlch = function() {
        $scope.items = [];
        $scope.items = Rights.alchRights();
    };

    $scope.showDrugs = function() {
        $scope.items = [];
        $scope.items = Rights.drugRights();
    };
    $scope.goBack = function() {
        $ionicHistory.goBack();  // This takes you back to the last view state.
    }
})

.controller("ContactController", function($scope, $ionicHistory, $ionicPopup, $http, Offenses) {
    $scope.form = {};
    $scope.sendEmail = function() {
        var counter = 0;
        for (var key in $scope.form) {
            if ($scope.form.hasOwnProperty(key)) {
                if(key != "comments"){
                    counter++;
                }
            }
        }
        if(counter != 4){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Error',
                template: 'Gelieve alle verplichte velden in te vullen (*)"'
            });
        }
        else{
            if(validateEmail($scope.form.email)){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Bedankt voor uw aanvraag.',
                template: 'U zal zo snel mogelijk een mail ontvangen met de benodigde informatie"'
            });
            var url = 'http://localhost/overtreding_api/v1/email';
            $http.post(url, {msg:'hello word!'}).
            success(function(data, status, headers, config) {
                console.log('wtf2');
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                console.log('wtf');
                console.log(status);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
            }
            else{
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Error.',
                    template: 'Invalid email adress'
                });
            }
        }

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();  // This takes you back to the last view state.
    }
})

.controller("CalcFineController", function($scope, $ionicHistory, $ionicPopup, $location, Offenses, Questions, Others) {
    $scope.offenses = [];
    $scope.menu = Questions.getQuestions("Menu");
    $scope.questions = [];
    $scope.searchResults = [];
    $scope.inputs = {};

    var offense = {type: ""};
    $scope.offenses.push(offense);

    $scope.menuItemTapped = function(menuItem){
        $scope.menu = [];
        var translations = {
            "SNELHEID": "Speed",
            "ALCOHOL": "Alchohol",
            "DRUGS": "Drugs",
            "ANDERE": "Other"
        };

        menuItem = translations[menuItem];
        offense = Offenses.createDefault(menuItem);
        $scope.offenses.splice($scope.offenses.length -1, 1, offense);

        $scope.questions = Questions.getQuestions(menuItem);

        if(menuItem === "Other"){
            $scope.showSearch = true;
        }
        if(menuItem === "Speed"){
            $scope.showInput = true;
        }
    };

    $scope.subgroupTapped = function(item, group, index) {
        $scope.questions[group.id].name =  item;
        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
        offense[fieldName] = index;
        if(offense.type === "Speed"){
            if(offense.road === 0){
                $scope.questions[3].items = ["10", "20", "30", "40", "50"];
            }
            else if(offense.road === 1){
                $scope.questions[3].items = ["10","20","30","40","50","60","70","80","90","100","110","120"];

            }
        }
        if(offense.type === "Alchohol"){
            if(offense.driver == 0){
                $scope.questions[3].items.unshift("0,20 - 0,50 PROMILLE");
            }
            else{
                offense[fieldName] = index + 1;
            }
        }
    };

    $scope.removeOffense = function(index){
        if(index === $scope.offenses.length -1){
            var confirmPopup = $ionicPopup.confirm({
                title: 'Error',
                template: 'Cannot remove uncompleted offense'
            });
        }
        else{
            $scope.offenses.splice(index, 1);
            Offenses.remove(index);
        }
    };

    $scope.createNewOffense = function(){
        var valid = offense != null && offense.type != "";
        if(valid && Offenses.validateOffense(offense))
        {
            $scope.menu = Questions.getQuestions("Menu");
            $scope.questions = [];
            $scope.showSearch = false;
            $scope.showInput = false;
            Offenses.add(offense);
            offense = {type: ""};
            $scope.offenses.push(offense);
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

    $scope.search = function() {
        $scope.searchResults.length = 0;
        $scope.searchResults = Others.searchOthers($scope.inputs.searchWord);
    };

    $scope.otherTapped = function(item) {
        offense.id = item.id;
        offense.degree = item.degree;
        offense.age = 1;
        offense.searchResults = 1;
        $scope.searchResults.length = 0;
        $scope.searchResults.push(item);

        $scope.questions = Questions.getQuestions("Test");
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
        var fieldName = Offenses.getFieldName(4, offense["type"]);
        offense[fieldName] = parseInt($scope.inputs.speed_driven);
        var fieldName = Offenses.getFieldName(5, offense["type"]);
        offense[fieldName] = parseInt($scope.inputs.speed_corrected);
    };
    $scope.toggleBorder = function(group){
        group.toggled = !group.toggled;
    }
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
    $scope.goBack = function() {
        $ionicHistory.goBack();  // This takes you back to the last view state.
    }
    $scope.resultTapped = function() {
        var valid = Offenses.validateOffense(offense);

        if(valid){
            $location.path("/result");
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
    }
})

.controller("ResultController", function($scope, $ionicHistory, $ionicPopup, Offenses) {
    $scope.items = Offenses.all();
    $scope.goBack = function() {
        $ionicHistory.goBack();  // This takes you back to the last view state.
    }
})

.controller("ResultDetailController", function($scope, $ionicHistory, $stateParams, $ionicPopup, Offenses, ResultTexts) {
    var titles = ["ONMIDDELLIJKE INNING", "MINNELIJKE SCHIKKING", "BEVEL TOT BETALING/RECHTBANK"];
    $scope.titles = titles;
    var offense = Offenses.findById($stateParams.offenseId);
    var offenseDisplayId = parseInt($stateParams.offenseId) + 1;
    $scope.title = "Overtreding " + offenseDisplayId + " " + offense.type;
    $scope.items = [];
    $scope.items = ResultTexts.getTexts(offense);
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})
.controller("TakePictureController", function($scope, $ionicHistory, Camera) {
    $scope.getPhoto = function() {
        Camera.getPicture().then(function(imageURI) {
            $scope.src =  imageURI;
            $scope.$apply();
            console.log(imageURI);
        }, function(err) {
            console.log(err);
        });
    };
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
});
