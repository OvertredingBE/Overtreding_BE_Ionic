/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.controllers', [])
.controller("HomeController", function($scope, $cordovaSQLite, $cordovaSplashscreen, $ionicPlatform, $timeout, $ionicPopup, $ionicLoading, Others2, Offenses){
    var confirmed = window.localStorage['confirmed'];
    if(!confirmed){
        window.localStorage['confirmed'] = true;
    }

    $scope.calcFineTapped = function(){
        Offenses.clear();
    }
    ionic.Platform.ready(function(){
        $cordovaSplashscreen.hide();

        $ionicLoading.show({
            template: "Laden.."
        });

        var flag = false;
        db.transaction(function (tx) {
            console.log("Creating Database");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Texts(id integer primary key, body text)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Rights(id integer primary key, type integer, body text)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Alchohol(id integer primary key, intoxication integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Drugs(id integer primary key, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Speed(id integer primary key, exceed integer, road integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Other(id integer primary key, degree integer, description text, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
            tx.executeSql("CREATE TABLE IF NOT EXISTS Other_Tags(tag_name text, offense_id integer)");

            console.log("Populating Database");

            if(!confirmed){


            var items = dbJson.texts;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
            }

            var items = dbJson.rights;
            for(var i = 0; i < items.length; i++){
                var textBody = items[i].body;
                var type = items[i].type;
                $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
            }

            var items = dbJson.speed;
            for(var i = 0; i < items.length; i++){
                var exceed = items[i].exceed;
                var road = items[i].road;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.alcohol;
            for(var i = 0; i < items.length; i++){
                var intoxication = items[i].intoxication;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.drugs;
            for(var i = 0; i < items.length; i++){
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Drugs (text_id_1,text_id_2,text_id_3) VALUES (?,?,?)", [text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.other;
            for(var i = 0; i < items.length; i++){
                var degree = items[i].degree;
                var description = items[i].description;
                var text_id_1 = items[i].text_id_1;
                var text_id_2 = items[i].text_id_2;
                var text_id_3 = items[i].text_id_3;
                $cordovaSQLite.execute(db, "INSERT INTO Other (degree, description, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [degree, description, text_id_1, text_id_2, text_id_3]);
            }

            var items = dbJson.other_tags;
            for(var i = 0; i < items.length; i++){
                var tag_name = items[i].tag_name;
                var offense_id = items[i].offense_id;
                $cordovaSQLite.execute(db, "INSERT INTO Other_Tags (tag_name, offense_id) VALUES (?,?)", [tag_name, offense_id]);
            }
            }
            flag = true;
            var tagsCount = 0;
            Others2.getAllTags().then(function(res){
                console.log(res.length);
                if(res.length < 2700){
                    $timeout(function () {
                        Others2.getAllTags().then(function(res2){
                            console.log(res2.length);
                            if(res2.length < 2700){
                                $timeout(function () {
                                    Others2.getAllTags().then(function(res3){
                                        console.log(res3.length);
                                        if(res3.length < 2700){
                                            $timeout(function () {
                                                Others2.getAllTags().then(function(res4){
                                                    console.log(res4.length);
                                                });
                                            }, 5000);
                                        }
                                        else{
                                            $ionicLoading.hide();
                                            $ionicPopup.alert({
                                                title: 'INFORMATIE',
                                                template: 'Hoewel deze informatie met de meeste zorg werd samengesteld, is deze informatie louter informatief. De gebruiker aanvaardt dat hieraan geen rechten kunnen worden ontleend.'
                                            });
                                        }
                                    });
                                }, 5000);
                            }
                            else{
                                $ionicLoading.hide();
                                $ionicPopup.alert({
                                    title: 'INFORMATIE',
                                    template: 'Hoewel deze informatie met de meeste zorg werd samengesteld, is deze informatie louter informatief. De gebruiker aanvaardt dat hieraan geen rechten kunnen worden ontleend.'
                                });
                            }
                        });
                    }, 5000);
                }
                else{
                    $ionicLoading.hide();
                    $ionicPopup.alert({
                        title: 'INFORMATIE',
                        template: 'Hoewel deze informatie met de meeste zorg werd samengesteld, is deze informatie louter informatief. De gebruiker aanvaardt dat hieraan geen rechten kunnen worden ontleend.'
                    });
                }
            });
            if(!flag){
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'Could not populate Database'
                });
            }
            console.log("Database populated.");
        });
    });
})
.controller("RightsController", function($scope, $ionicHistory, $location, Rights, ContactService, Texts) {
    $scope.items = [];
    Texts.getRights(0).then(function(res){
        for (var i = 0; i < res.length; i++) {
            $scope.items.push({body:res.item(i).body});
        }
    });

    $scope.showAlch = function() {
        $scope.items.length = 0;
        Texts.getRights(0).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.items.push({body:res.item(i).body});
            }
        });
        $scope.selected = 1;
    };

    $scope.showDrugs = function() {
        $scope.items.length = 0;
        Texts.getRights(1).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.items.push({body:res.item(i).body});
            }
        });
        $scope.selected = 2;
    };

    $scope.goToContact = function(){
        ContactService.setFunctionality("Rights");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("ContactController", function($scope, $ionicHistory, $ionicPopup, $http, Offenses, ContactService, TranslateService, Utils, SecuredPopups) {
    $scope.form = {};

    $scope.resultTapped = function() {

        $scope.isDisabled =true;
        var counter = 0;
        for (var key in $scope.form) {
            if ($scope.form.hasOwnProperty(key)) {
                if(key != "comments"){
                    counter++;
                }
            }
        }
        if(counter != 4){
            $ionicPopup.alert({
                title: 'FOUT',
                template: 'Gelieve alle verplichte velden in te vullen (*)'
            });
        }
        else{
            $scope.spinnerShown = true;
            // if(Utils.validateEmail($scope.form.email)){
            var url = 'http://api.overtreding.be/overtreding_api/v1/test';
            var data = $scope.form;
            var functionalityTypeStr = ContactService.getFunctionality();
            switch (functionalityTypeStr) {
                case "CalcFine":
                var offenses = Offenses.parsed();
                break;
                case "TakePicture":
                var imageData = ContactService.getImageData();
                default:
            }

            var functionalityType = {functionality: TranslateService.englishToDutch(functionalityTypeStr)};
            var imageDataJson = {imageData: imageData};
            var offensesJson = {offenses: offenses};
            var result={};
            for(var key in data) result[key]=data[key];
            for(var key in functionalityType) result[key]=functionalityType[key];
            for(var key in offensesJson) result[key]=offensesJson[key];
            for(var key in imageDataJson) result[key]=imageDataJson[key];

            $http.post(url, result).then(function (res){
                $scope.spinnerShown = false;
                var alertPopup = SecuredPopups.show('alert', {
                    title: 'INFORMATIE',
                    template: 'Bedankt voor uw aanvraag. U wordt zo snel mogelijk gecontacteerd.'
                });
                alertPopup.then(function(res) {
                    $scope.isDisabled =false;
                });

                $scope.response = res.data;
            }, function(err){
                $scope.spinnerShown = false;
                var alertPopup = SecuredPopups.show('alert', {
                    title: 'FOUT',
                    template: 'Er is geen internetconnectie gedecteerd. Controleer uw internetconnectie en probeer opnieuw aub.'
                });
                alertPopup.then(function(res) {
                    $scope.isDisabled =false;
                });
                $scope.response = err.code;
            });
        }
    };

    $scope.getCity = function(){
        var code = $scope.form.postcode;
        var asd = Utils.getNameForZipCode(code);
        $scope.form.postcode = asd;
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("CalcFineController", function($scope, $ionicHistory, $ionicPopup, $location, Questions, Offenses, Utils, TranslateService, Formulas, Others2, ContactService) {
    $scope.offenses = [];
    $scope.searchResults = [];
    $scope.showSearch = false;
    $scope.infoShown = false;
    $scope.inputs = {};
    $scope.menu = Questions.getQuestions("Menu");
    var indexShown = 0;
    var offense = null;
    $scope.isEditting = false;
    var edittingIndex = -1;
    addDummyOffense();
    resetFields();
    $scope.menuShown = true;
    $scope.doSomething = function(){
        $ionicPopup.alert({
            title: 'INFORMATIE',
            template: 'Gelieve alle velden van een antwoord te voorzien'
        });
    };
    $scope.menuSubgroupTapped = function(menuItem){
        var type = TranslateService.dutchToEnglish(menuItem);
        offense = Offenses.createDefault(type);
        $scope.offenses.splice($scope.offenses.length -1, 1, offense);

        $scope.questions = Questions.getQuestions(type);
        $scope.menuShown = false;

        var offenses = Offenses.all();
        if(offenses.length > 0){
            var firstOffense = Offenses.findById(0);
            offense.age = firstOffense.age;
            offense.licence = firstOffense.licence;
            if(offense.age === 0){
                $scope.questions[1].name = "JONGER DAN 18 JAAR";
            }
            else{
                $scope.questions[1].name = "18 JAAR OF OUDER";

            }
            if(offense.licence === 0){
                $scope.questions[0].name = "IK BEZIT MIJN RIJBEWIJS MINDER DAN 2 JAAR";
            }
            else{
                $scope.questions[0].name = "IK BEZIT MIJN RIJBEWIJS LANGER DAN 2 JAAR";
            }

            indexShown = 2;
        }
        if(type === "Speed"){
            $scope.questionsShown = true;
            $scope.showInput = true;
        }
        else{
            $scope.questionsShown = true;
            $scope.toggleBorder($scope.questions[$scope.questions.length - 1]);
        }

        if(type === "Other"){
            $scope.questionsShown = false;
            $scope.showSearch = true;
            $scope.searchMessage = "Vul hierboven een trefwoord of artikelnummer in en zoek uw overtreding. Voeg een komma toe om te zoeken door middel van meerdere trefwoorden.";
        }
        var questionsLen = $scope.questions.length;
        if(questionsLen <= indexShown){
        }
        else{
            $scope.toggleBorder($scope.questions[indexShown]);
        }
    };

    $scope.subgroupTapped = function(item, group, index) {

        var flag = false;

        if($scope.isEditting){
            if(group.id === 0){
                var confirmPopup = $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'Door uw antwoord op de vragen "Rijbewijs" en "Leeftijd" te veranderen, veranderen deze antwoorden ook in de andere gecreëerde overtredingen'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $scope.questions[group.id].name = item;
                        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
                        offense[fieldName] = index;
                        var offenses = Offenses.all();
                        for (var i = 0; i < offenses.length; i++) {
                            var fOffense = offenses[i];
                            if(index === 1){
                                fOffense.licence = index;
                                fOffense.age = index;
                            }
                            else{
                                fOffense.licence = index;
                            }
                        }
                    }
                });
            }
            if(group.id === 1){

                var confirmPopup = $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'Door uw antwoord op de vragen "Rijbewijs" en "Leeftijd" te veranderen, veranderen deze antwoorden ook in de andere gecreëerde overtredingen'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $scope.questions[group.id].name = item;
                        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
                        offense[fieldName] = index;
                        var offenses = Offenses.all();
                        for (var i = 0; i < offenses.length; i++) {
                            var fOffense = offenses[i];
                            fOffense.age = index;
                        }
                    }
                });
            }
        }
        else{
            $scope.questions[group.id].name = item;
            var fieldName = Offenses.getFieldName(group.id, offense["type"]);
            offense[fieldName] = index;
        }

        if(group.id === 0){
            if(index === 1){
                indexShown++;
                offense.age = 1;
                $scope.questions[1].name = "18 JAAR OF OUDER";
            }
        }

        if(offense.type === "Alchohol"){
            if(offense.driver == 0){
                $scope.questions[3].items.unshift("0,20 - 0,50 PROMILLE");
            }
            else{
                offense["intoxication"] = index + 1;
            }
        }
    };

    $scope.toggleBorder = function(group){
        group.toggled = !group.toggled;
    }

    $scope.groupShown = function(groupIndex){
        if(groupIndex === indexShown){
            return 1;
        }
        else{
            return 0;
        }
    }
    $scope.changeShownGroup = function(groupIndex) {
        indexShown++;

        if(indexShown === $scope.questions.length){
            $scope.toggleBorder($scope.questions[indexShown-1]);
            indexShown = -1;
        }
        else {
            if(indexShown != $scope.questions.length-1){
                $scope.toggleBorder($scope.questions[indexShown]);
            }
        }
    };
    $scope.editOffense = function(index){
        var flag = true;
        if($scope.isEditting){
            flag = false;
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve het aanpassen van uw overtreding te vervolledigen'
            });
        }
        if(offense != null){
            if(offense.type === "" || !Utils.validateOffense(offense)){
                var confirmPopup = $ionicPopup.confirm({
                    title: 'INFORMATIE',
                    template: 'Input will be lost, continue ?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $scope.offenses.pop();
                    }
                    else{
                        flag = false;
                    }
                });
            }
            else{
                addCurrOffense();
            }
        }
        if(flag){
            $scope.isEditting = true;
            edittingIndex = index;
            var fetchedOffense = Offenses.findById(index);
            offense = fetchedOffense;
            resetFields();
            $scope.menuShown = false;
            $scope.questions = Questions.getQuestions(fetchedOffense.type);
            $scope.toggleBorder($scope.questions[0]);
            if(fetchedOffense.type != "Speed"){
                $scope.toggleBorder($scope.questions[$scope.questions.length-1]);
            }
            $scope.questionsShown = true;

            for (var key in fetchedOffense) {
                if (fetchedOffense.hasOwnProperty(key)) {
                    if(key === "type" || (key === "speed_corrected" || key==="speed_driven")){
                    }
                    else{
                        var index = -1;
                        switch (key) {
                            case 'licence':
                            index = 0;
                            break;
                            case 'age':
                            index = 1;
                            break;
                            case 'road':
                            index = 2;
                            break;
                            case 'speed_limit':
                            index = 3;
                            break;
                            case 'driver':
                            index = 2;
                            break;
                            case 'intoxication':
                            index = 3;
                            break;
                            case 'blood_test':
                            index = 2;
                            break;
                            default:
                        }
                        $scope.questions[index].name = Questions.getQuestionsForField(key)[fetchedOffense[key]];
                    }
                }
            }
            if(offense.type === "Speed"){
                $scope.showInput = true;
                $scope.inputs.speed_driven = offense.speed_driven;
                $scope.inputs.speed_corrected = offense.speed_corrected;

            }
        }
    };
    $scope.submitEdit = function(){
        $scope.questionsShown = false;
        $scope.showInput = false;
        $scope.isEditting = false;
        edittingIndex = -1;
        Offenses.replaceAtIndex(edittingIndex, offense);
        offense = null;
    };

    $scope.createNewOffense = function(){
        if($scope.isEditting){
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve het aanpassen van uw overtreding te vervolledigen'
            });
        }
        else{
            if(offense === null){
                addDummyOffense();
                resetFields();
                $scope.menuShown = true;
            }
            else{
                if(addCurrOffense()){
                    addDummyOffense();
                    resetFields();
                    $scope.menuShown = true;
                }
                else{
                    $ionicPopup.alert({
                        title: 'INFORMATIE',
                        template: 'Gelieve alle velden van een antwoord te voorzien'
                    });
                }
            }
        }
    };

    $scope.removeOffense = function(index){
        var confirmPopup = $ionicPopup.confirm({
            title: 'INFORMATIE',
            template: 'Bent u zeker dat u deze overtreding wil verwijderen ?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                if($scope.isEditting){
                    resetFields();
                    offense = null;
                    $scope.isEditting = false;
                    $scope.offenses.splice(index, 1);
                    Offenses.remove(index);
                }
                else{
                    if(index === $scope.offenses.length -1){
                        $scope.offenses.splice(index, 1);
                        resetFields();
                        $scope.menuShown = false;
                        offense = null;
                    }
                    else{
                        $scope.offenses.splice(index, 1);
                        Offenses.remove(index);
                    }
                }
            }
        });
    };

    $scope.resultTapped = function() {
        var offenses = Offenses.all();
        var flag = false;

        if($scope.isEditting){
            flag = true;
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve het aanpassen van uw overtreding te vervolledigen'
            });
        }

        if(offense === null){
            if(offenses.length === 1){
                $location.path("/result/0");
            }
            else{
                $location.path("/result");
            }
        }
        else{
            if(offense.type === "Speed"){
                var input = $scope.inputs.speed_driven;
                var speedDriven = parseInt(input);
                var speedCorrected = Formulas.getCorrectedSpeed(speedDriven);
                var speedLimit = (offense.speed_limit+1) * 10;
                if(speedCorrected <= speedLimit){
                    flag = true;
                    $ionicPopup.alert({
                        title: 'INFORMATIE',
                        template: 'De gecorrigeerde snelheid kan niet lager zijn dan snelheidslimiet. Gelieve opnieuw te proberen.'
                    });
                }
            }
            if(!flag){
                if(addCurrOffense()){
                    resetFields();
                    offense = null;
                    var offenses = Offenses.all();
                    if(offenses.length === 1){
                        $location.path("/result/0");
                    }
                    else{
                        $location.path("/result");
                    }
                }
                else{
                    $ionicPopup.alert({
                        title: 'INFORMATIE',
                        template: 'Gelieve alle velden van een antwoord te voorzien'
                    });
                }
            }
        }

    };

    $scope.calcSpeed = function() {
        var input = $scope.inputs.speed_driven;
        var valid = true;

        if(isNaN(input)){
            valid = false;
            $scope.inputs.speed_driven = "";
        }
        else{
            var speedDriven = parseInt(input);
            var speedCorrected = Formulas.getCorrectedSpeed(speedDriven);
            var speedLimit = (offense.speed_limit+1) * 10;

            if(speedCorrected < 10 || speedDriven < 10){
                valid = false;
            }
            else if(speedCorrected <= speedLimit){
                valid = false;
                $scope.inputs.speed_corrected = speedCorrected;
            }
            else{
            $scope.inputs.speed_corrected = speedCorrected;
        }

        }
        if(valid){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_driven);
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_corrected);
        }
        else{
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = -1;
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = -1
        }
    };

    $scope.calcSpeed2 = function() {
        var input = $scope.inputs.speed_corrected;
        var valid = true;

        if(isNaN(input)){
            valid = false;
            $scope.inputs.speed_driven = "";
        }
        else{
            var speedCorrected = parseInt(input);
            var speedDriven = Formulas.getDrivenSpeed(speedCorrected);
            var speedLimit = (offense.speed_limit+1) * 10;
            if(speedCorrected < 10){
                valid = false;
            }
            else if(speedCorrected <= speedLimit){
                valid = false;
                $scope.inputs.speed_driven = speedDriven;
            }
            else{
                $scope.inputs.speed_driven = speedDriven;
            }
        }
        if(valid){
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_driven);
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = parseInt($scope.inputs.speed_corrected);
        }
        else{
            var fieldName = Offenses.getFieldName(4, offense["type"]);
            offense[fieldName] = -1;
            var fieldName = Offenses.getFieldName(5, offense["type"]);
            offense[fieldName] = -1
        }
    };
    $scope.test = function(){
        Others2.getAllTags().then(function(res){
            console.log(res.length);

        });
    };
    $scope.search = function() {
        offense.age = 0;
        offense.licence = 0;
        $scope.searchResults.length = 0;
        $scope.questionsShown = false;
        var searchWords = $scope.inputs.searchWord;
        searchWords = searchWords.toLowerCase();
        var searchArr = Utils.multiSplit(searchWords,[',',' ']);
        Others2.searchOthers(searchArr).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.searchResults.push({
                    id: res.item(i).id,
                    degree: res.item(i).degree,
                    description: res.item(i).description});
                }
                if(res.length === 0){
                    $scope.searchMessage = "Er is geen resultaat voor uw zoekopdracht. Gelieve opnieuw te proberen met andere trefwoorden";
                }
            });
    };
    $scope.clearSearch = function(){
        $scope.inputs.searchWord = "";
    };

    $scope.otherTapped = function(item) {
        $scope.searchResults.length = 0;
        $scope.searchResults.push(item);
        offense.id = item.id;
        offense.degree = item.degree;
        offense.description = item.description;
        $scope.questionsShown = true;
    };
    $scope.showInfo = function(){
        $ionicPopup.alert({
            title: 'INFORMATIE',
            template: 'Hoewel deze informatie met de meeste zorg werd samengesteld, is deze informatie louter informatief. De gebruiker aanvaardt dat hieraan geen rechten kunnen worden ontleend.'
        });
    };

    function addDummyOffense(){
        offense = {type: ""};
        $scope.offenses.push(offense);
    }

    function addCurrOffense(){
        var valid = Utils.validateOffense(offense) && offense.type != "";
        if(valid){
            Offenses.add(offense);
            return true;
        }
        return false;
    }

    function resetFields(){
        indexShown = 0;
        $scope.questionsShown = false;
        $scope.showSearch = false;
        $scope.showInput = false;
        $scope.searchResults.length = 0;
        $scope.inputs.speed_driven = "";
        $scope.inputs.speed_corrected = "";
        $scope.inputs.searchWord = "";
    }

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})

.controller("ResultController", function($scope, $ionicHistory, $location, Offenses, CombinedFines, FinesCalculator, Texts, ExceptionTexts, ContactService) {
    var offenses = Offenses.all();
    $scope.offenses = offenses;

    var qualifyOI = CombinedFines.qualifyOI();
    var qualifyMS = CombinedFines.qualifyMS();
    console.log("ASDASD:" + qualifyOI);
    var sumOI = 0;
    var sumMS = 0;

    $scope.message = "Hieronder vindt u het bedrag per overtreding. Ontdek welke gevolgen elke overtreding met zich meebrengt. Wilt u graag meer informatie over deze overtredingen, aarzel dan niet en vraag GRATIS juridisch advies via onderstaande button.";

    ExceptionTexts.getExceptionTexts().then(function(res2){
        var excTexts = [];
        for (var i = 0; i < res2.length; i++) {
            excTexts.push(res2.item(i).body);
        }
    });
    var excIdsMS = [11,15,30,31,51,59,65];
    var excIdsOI = [10,13,17,27,29,33,35,41,50,58];

        for (var i = 0; i < offenses.length; i++) {
            var offense  = offenses[i];
            var texts = [];
            var fines = FinesCalculator.getFines(offense);
            for (var key in fines) {
                if (fines.hasOwnProperty(key)) {
                    console.log(key + " -> " + fines[key]);
                    if(key === "#TOTALAMOUNT3#" || key === "#TOTALAMOUNT5#"){
                    var fineString = fines[key].toString();
                    var fineAmounts = fineString.split(" tot ");
                    sumOI +=parseInt(fineAmounts[0]);
                    }
                    if(key === "#TOTALAMOUNT4#" || key === "#TOTALAMOUNT6#"){
                    var fineString = fines[key].toString();
                    var fineAmounts = fineString.split(" tot ");
                    sumMS +=parseInt(fineAmounts[0]);
                    }
                }
            }
            Texts.getTexts(offense).then(function(res){
                    for (var j = 0; j < excIdsMS.length; j++) {
                        if(excIdsMS[j] === res.item(1).id){
                            qualifyMS = false;
                        }
                    }

                    for (var k = 0; k < excIdsOI.length; k++) {
                        if(excIdsOI[k] === res.item(0).id){
                            qualifyOI = false;
                        }
                    }

                if(offense.type != "Alchohol"){
                sumOI += FinesCalculator.getFinesForText(res.item(0).body);
                sumMS += FinesCalculator.getFinesForText(res.item(1).body);
                }
                console.log(sumOI);
                console.log(sumMS);
                if(sumOI > 330){
                    qualifyOI = false;
                }
                if(sumOI > 1500){
                    qualifyMS = false;
                }
                if(sumMS > 1500){
                    qualifyMS = false;
                }

                if(!qualifyOI){
                    $scope.message = "Deze combinatie van overtredingen zorgt ervoor dat u niet in aanmerking komt voor een onmiddellijke inning. U komt wel in aanmerking voor een minnelijke schikking. Hieronder vindt u het bedrag per overtreding. Ontdek welke gevolgen elke overtreding met zich meebrengt. Wilt u graag meer informatie over deze overtredingen, aarzel dan niet en vraag GRATIS juridisch advies via onderstaande button.";
                }
                if(!qualifyMS){
                    $scope.message = "Deze combinatie van overtredingen zorgt ervoor dat u niet in aanmerking komt voor een onmiddellijke inning of minnelijke schikking. U zal sowieso voor de rechtbank moeten verschijnen. Wilt u GRATIS advies en bijstand van een jurist of advocaat , klik dan op onderstaand button.";
                }
            });
        }

    $scope.goToContact = function(){
        ContactService.setFunctionality("CalcFine");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    };
})

.controller("ResultDetailController", function($scope, $ionicHistory, $stateParams, $ionicPopup, Offenses, FinesCalculator,Utils, Texts, OffenseEvaluator, $location, ContactService) {
    $scope.items = [];
    var texts = [];
    var titles = ["ONMIDDELLIJKE INNING", "MINNELIJKE SCHIKKING", "BEVEL TOT BETALING/RECHTBANK"];
    $scope.titles = titles;

    var offense = Offenses.findById($stateParams.offenseId);
    var offenseDisplayId = parseInt($stateParams.offenseId) + 1;
    $scope.offenseId = offenseDisplayId;
    $scope.offenseType = offense.type;

    var fines = FinesCalculator.getFines(offense);
    Texts.getTexts(offense).then(function(res){
        for (var i = 0; i < res.length; i++) {
            texts.push(Utils.replaceFines(res.item(i).body, fines));
        }
        OffenseEvaluator.evaluateOffense(texts, offense);
        OffenseEvaluator.evaluateCombined(texts);
    });
    $scope.items = texts;

    $scope.goToContact = function(){
        ContactService.setFunctionality("CalcFine");
        $location.path("/contact");
    };

    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
})

.controller("TakePictureController", function($scope, $ionicHistory, $ionicPopup, $location,Camera, ContactService, Utils) {
    $scope.items = [];
    $scope.addPhoto = function(){
        Camera.getPicture().then(function(imageURI) {
            $scope.items.push("data:image/jpeg;base64," + imageURI);
        }, function(err) {
            console.log(err);
        });
    };
    $scope.removePhoto = function(index){
        $scope.items.splice(index, 1);
    }
    $scope.goToContact = function(){
        $scope.imgUris = [];
        if($scope.items.length === 0){
            var confirmPopup = $ionicPopup.alert({
                title: 'INFORMATIE',
                template:  "Gelieve een foto te nemen van de brief die u ontving en deze door te sturen via de button vraag GRATIS juridisch advies.\n Wij bekijken dan wat wij voor u kunnen doen en nemen contact met u op. Alvast bedankt!"
            });
            confirmPopup.then(function(res) {
                if(res) {
                    Camera.getPicture().then(function(imageURI) {
                        $scope.items.push(imageURI);
                    }, function(err) {
                        console.log(err);
                    });
                } else {
                }
            });
        }
        else{
            ContactService.setFunctionality("TakePicture");
            ContactService.setImageData($scope.items);
            $location.path("/contact");
        }
    }
    $scope.goBack = function() {
        $ionicHistory.goBack();
    }
});
