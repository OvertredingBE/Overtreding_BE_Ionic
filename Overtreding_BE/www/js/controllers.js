/**
* Created by MartinDzhonov on 6/1/15.
*/
angular.module('starter.controllers', [])
.controller("HomeController", function($scope, $cordovaSQLite, $cordovaFile, $cordovaSplashscreen, $ionicPlatform, $timeout, $ionicPopup, $ionicLoading, Others2, Offenses){
    //show info message when opening the app for the first time
    var confirmed = window.localStorage['confirmed'];
    if(!confirmed){
        $ionicPopup.alert({
            title: 'INFORMATIE',
            template: 'Hoewel deze informatie met de meeste zorg werd samengesteld, is deze informatie louter informatief. De gebruiker aanvaardt dat hieraan geen rechten kunnen worden ontleend.'
        });
        window.localStorage['confirmed'] = true;
    }
    db = window.openDatabase("test3", "1.0", "Test DB", 1000000);

    // var query = "SELECT * FROM Speed b WHERE b.exceed = ? AND b.road = ?";
    // var exceed = 3;
    // var road = 1;
    // $cordovaSQLite.execute(db, query, [exceed, road]).then(function(res){
    //     for (var i = 0; i < res.rows.length; i++) {
    //         console.log(res.rows.item(i).id + " " +res.rows.item(i).exceed + " " + res.rows.item(i).road + " " + res.rows.item(i).text_id_1);
    //     }
    // }, function(err){
    //     console.error(err);
    // });
    // var query = "SELECT * FROM Texts";
    // var exceed = 3;
    // var road = 1;
    // $cordovaSQLite.execute(db, query, []).then(function(res){
    //     console.log(res.rows.length);
    // }, function(err){
    //     console.error(err);
    // });
    //clear all current offenses when going to calc fine screen
    $scope.calcFineTapped = function(){
        Offenses.clear();
    }

    // ionic.Platform.ready(function(){
    //     $cordovaSplashscreen.hide();
    //
    //     $ionicLoading.show({
    //         template: "Laden.."
    //     });
    //
    //     db.transaction(function (tx) {
    //         console.log("Creating Database");
    //         tx.executeSql("DROP TABLE IF EXISTS Texts");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Texts(id integer primary key, body text)");
    //         tx.executeSql("DROP TABLE IF EXISTS Rights");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Rights(id integer primary key, type integer, body text)");
    //         tx.executeSql("DROP TABLE IF EXISTS Alchohol");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Alchohol(id integer primary key, intoxication integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
    //         tx.executeSql("DROP TABLE IF EXISTS Drugs");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Drugs(id integer primary key, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
    //         tx.executeSql("DROP TABLE IF EXISTS Speed");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Speed(id integer primary key, exceed integer, road integer, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
    //         tx.executeSql("DROP TABLE IF EXISTS Other");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Other(id integer primary key, degree integer, description text, text_id_1 integer, text_id_2 integer, text_id_3 integer)");
    //         tx.executeSql("DROP TABLE IF EXISTS Other_Tags");
    //         tx.executeSql("CREATE TABLE IF NOT EXISTS Other_Tags(tag_name text, offense_id integer)");
    //
    //         console.log("Populating Database");
    //         var items = dbJson.texts;
    //         for(var i = 0; i < items.length; i++){
    //             var textBody = items[i].body;
    //             $cordovaSQLite.execute(db, "INSERT INTO Texts (body) VALUES (?)", [textBody]);
    //         }
    //
    //         var items = dbJson.rights;
    //         for(var i = 0; i < items.length; i++){
    //             var textBody = items[i].body;
    //             var type = items[i].type;
    //             $cordovaSQLite.execute(db, "INSERT INTO Rights (type, body) VALUES (?,?)", [type, textBody]);
    //         }
    //
    //         var items = dbJson.speed;
    //         for(var i = 0; i < items.length; i++){
    //             var exceed = items[i].exceed;
    //             var road = items[i].road;
    //             var text_id_1 = items[i].text_id_1;
    //             var text_id_2 = items[i].text_id_2;
    //             var text_id_3 = items[i].text_id_3;
    //             $cordovaSQLite.execute(db, "INSERT INTO Speed (exceed, road, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [exceed, road, text_id_1, text_id_2, text_id_3]);
    //         }
    //
    //         var items = dbJson.alcohol;
    //         for(var i = 0; i < items.length; i++){
    //             var intoxication = items[i].intoxication;
    //             var text_id_1 = items[i].text_id_1;
    //             var text_id_2 = items[i].text_id_2;
    //             var text_id_3 = items[i].text_id_3;
    //             $cordovaSQLite.execute(db, "INSERT INTO Alchohol (intoxication, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?)", [intoxication, text_id_1, text_id_2, text_id_3]);
    //         }
    //
    //         var items = dbJson.drugs;
    //         for(var i = 0; i < items.length; i++){
    //             var text_id_1 = items[i].text_id_1;
    //             var text_id_2 = items[i].text_id_2;
    //             var text_id_3 = items[i].text_id_3;
    //             $cordovaSQLite.execute(db, "INSERT INTO Drugs (text_id_1,text_id_2,text_id_3) VALUES (?,?,?)", [text_id_1, text_id_2, text_id_3]);
    //         }
    //
    //         var items = dbJson.other;
    //         for(var i = 0; i < items.length; i++){
    //             var degree = items[i].degree;
    //             var description = items[i].description;
    //             var text_id_1 = items[i].text_id_1;
    //             var text_id_2 = items[i].text_id_2;
    //             var text_id_3 = items[i].text_id_3;
    //             $cordovaSQLite.execute(db, "INSERT INTO Other (degree, description, text_id_1,text_id_2,text_id_3) VALUES (?,?,?,?,?)", [degree, description, text_id_1, text_id_2, text_id_3]);
    //         }
    //
    //         var items = dbJson.other_tags;
    //         for(var i = 0; i < items.length; i++){
    //             var tag_name = items[i].tag_name;
    //             var offense_id = items[i].offense_id;
    //             $cordovaSQLite.execute(db, "INSERT INTO Other_Tags (tag_name, offense_id) VALUES (?,?)", [tag_name, offense_id]);
    //         }
    //         $ionicLoading.hide();
    //         console.log("Database populated.");
    //     });
    // });
    $scope.test= function(){
        var db = window.openDatabase("test3", "1.0", "Test DB", 1000000);

        var type = 1;
        var query = "SELECT * FROM Other_Tags";
        $cordovaSQLite.execute(db, query, []).then(function(res){
            console.log(res.rows.length);
        }, function(err){
            console.error(err);
        });
    };
})
.controller("RightsController", function($scope, $ionicHistory, $location, ContactService, Rights, Utils) {
    $scope.items = [];
    $scope.html = "<b>ASDsda</b>";
    Rights.getRights(0).then(function(res){
        for (var i = 0; i < res.length; i++) {
            $scope.items.push({body:res.item(i).body});
        }
    });

    $scope.showAlch = function() {
        $scope.items.length = 0;
        Rights.getRights(0).then(function(res){
            for (var i = 0; i < res.length; i++) {
                $scope.items.push({body:res.item(i).body});
            }
        });
        $scope.selected = 1;
    };

    $scope.showDrugs = function() {
        $scope.items.length = 0;
        Rights.getRights(1).then(function(res){
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
    $scope.messageShown = true;
    var functionalityTypeStr = ContactService.getFunctionality();

    if(functionalityTypeStr === "TakePicture"){
        $scope.message = "Gelieve hieronder uw vraag te stellen. U ontvangt dan zo snel mogelijk een gratis juridisch advies van een advocaat of jurist. Vanzelfsprekend worden uw gegevens vertrouwelijk behandeld.";
    }
    else{
        $scope.message = "Gelieve hieronder uw vraag te stellen. U ontvangt dan zo snel mogelijk een gratis juridisch advies van een advocaat of jurist. Vanzelfsprekend worden uw gegevens vertrouwelijk behandeld. Wilt u een bijlage toevoegen, gelieve dan gebruik te maken van de module \"u ontving een brief\".";
    }

    $scope.resultTapped = function() {
        //disable result button until validation or response from server
        $scope.isDisabled =true;
        //check for all mandatory fields(comments is not mandatory)
        var counter = 0;
        for (var key in $scope.form) {
            if ($scope.form.hasOwnProperty(key)) {
                if(key != "comments"){
                    counter++;
                }
            }
        }
        if(counter != 4){
            $scope.isDisabled =false;
            $ionicPopup.alert({
                title: 'FOUT',
                template: 'Gelieve alle verplichte velden in te vullen (*)'
            });
        }
        else{
            if(Utils.validateEmail($scope.form.email)){
                $scope.spinnerShown = true;
                var form = $scope.form;
                switch (functionalityTypeStr) {
                    case "CalcFine":
                    var offensesTranslated = Offenses.parsed();
                    break;
                    case "TakePicture":
                    var imageData = ContactService.getImageData();
                    default:
                }
                var functionalityTranslated = TranslateService.englishToDutch(functionalityTypeStr);
                var functionalityType = {functionality: functionalityTranslated};
                var imageDataJson = {imageData: imageData};
                var offensesJson = {offenses: offensesTranslated};
                var dataJson={};
                for(var key in form) dataJson[key]=form[key];
                for(var key in functionalityType) dataJson[key]=functionalityType[key];
                for(var key in offensesJson) dataJson[key]=offensesJson[key];
                for(var key in imageDataJson) dataJson[key]=imageDataJson[key];

                var url = 'http://api.overtreding.be/overtreding_api/v1/test';
                $http.post(url, dataJson).then(function (res){
                    $scope.response = res;
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
                    $scope.response = err;
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
            else{
                $scope.isDisabled =false;
                $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'Vul een geldig e-mail adres in.'
                });
            }
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

.controller("CalcFineController", function($scope, $ionicHistory, $ionicPopup, $location,$ionicScrollDelegate, Questions, Offenses, Utils, TranslateService, Formulas, Others2, ContactService) {
    $scope.offenses = [];
    $scope.searchResults = [];
    $scope.test=true;
    $scope.showMenu = false;
    $scope.showQuestions = true;
    $scope.showSearch = false;
    $scope.isEditting = false;
    $scope.showEditOther = false;
    $scope.arrowTapped = false;
    $scope.showKeyboard = false;
    $scope.inputs = {};
    var indexShown = 0;
    var edittingIndex = -1;
    var offense = null;

    $scope.menu = Questions.getQuestions("Menu");
    addDummyOffense();
    resetFields();
    $scope.showMenu = true;

    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e){
        $scope.test=false;
        $scope.$apply();
        console.log('Keyboard height is: ' + e.keyboardHeight);
    }

    function keyboardHideHandler(e){
        $scope.test = true;
        $scope.$apply();
        console.log('Goodnight, sweet prince');
    }
    $scope.menuSubgroupTapped = function(menuItem){
        $scope.showMenu = false;

        indexShown = 0;
        var type = TranslateService.dutchToEnglish(menuItem);
        offense = Offenses.createDefault(type);
        $scope.offenses.splice($scope.offenses.length -1, 1, offense);
        $scope.questions = Questions.getQuestions(type);

        var offenses = Offenses.all();
        if(offenses.length > 0){
            var firstOffense = Offenses.findById(0);
            offense.age = firstOffense.age;
            offense.licence = firstOffense.licence;
            if(offense.licence != -1){
                $scope.questions[0].name = Questions.getQuestionsForField("licence")[offense.licence]
                indexShown++;
            }
            if(offense.age != -1){
                $scope.questions[1].name = Questions.getQuestionsForField("age")[offense.age]
                indexShown++;
            }
        }

        if(type === "Speed"){
            $scope.showQuestions = true;
            $scope.showInput = true;
        }
        else{
            $scope.showQuestions = true;
        }

        if(type === "Other"){
            $scope.showQuestions = false;
            $scope.showSearch = true;
            $scope.searchMessage = "Vul hierboven een trefwoord of artikelnummer in en zoek uw overtreding. Voeg een komma toe om te zoeken door middel van meerdere trefwoorden.";
        }
    };

    $scope.subgroupTapped = function(item, group, index) {
        $ionicScrollDelegate.scrollBottom();
        var flag = false;
        if(group.id === 0){
            if(index === 1){
                if(!$scope.arrowTapped)
                {
                    indexShown = 1;
                }
                else{
                    indexShown = -10;
                }
                offense.age = 1;
                $scope.questions[1].name = Questions.getQuestionsForField("age")[offense.age]
            }
        }
        if(group.id === 1){
            if(index === 0){
                offense.licence = 0;
                $scope.questions[0].name = Questions.getQuestionsForField("licence")[offense.licence]
            }
        }

        if($scope.offenses.length > 1){
            if(group.id === 0 || group.id === 1){
                var confirmPopup = $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'Door uw antwoord op de vragen "Rijbewijs" en "Leeftijd" te veranderen, veranderen deze antwoorden ook in de andere gecreëerde overtredingen'
                });
                var offenses = Offenses.all();
                for (var i = 0; i < offenses.length; i++) {
                    var fOffense = offenses[i];
                    fOffense.licence = index;
                    if(group.id === 0){
                        if(index === 1){
                            fOffense.age = index;
                        }
                    }
                    if(group.id === 1){
                        fOffense.age = index;
                    }
                }
            }
        }
        var fieldName = Offenses.getFieldName(group.id, offense["type"]);
        offense[fieldName] = index;
        $scope.questions[group.id].name = item;

        if(offense.type === "Alchohol"){
            if(offense.driver == 0){
                $scope.questions[3].items.unshift("0,20 - 0,50 promille / 0,09 mg/l - 0,22 mg/l");
            }
            else{
                if(offense["intoxication"] != -1){
                    offense["intoxication"] = index + 1;
                }
            }
        }
        if($scope.arrowTapped){
            indexShown = -10;
        }
        else{
            indexShown++;
        }
        $scope.arrowTapped = false;
    };

    $scope.editField = function(index){
        $ionicScrollDelegate.scrollBottom();
        if($scope.arrowTapped){
            indexShown = -10;
            $scope.arrowTapped = false;
        }
        else{
            indexShown = index;
            $scope.arrowTapped = true;
        }
    };

    $scope.editOtherTapped = function(){
        $scope.showEditOther = false;
        $scope.showQuestions = false;
        $scope.showSearch = true;
    }

    $scope.editOffense = function(index){
        $scope.test = true;

        var canEdit = true;
        if($scope.isEditting){
            canEdit = false;
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve het aanpassen van uw overtreding te vervolledigen'
            });
        }
        else{
            if(offense != null){
                if(offense.type === ""){
                    $scope.offenses.pop();
                }
                else{
                    addCurrOffense();
                }
            }
        }

        if(canEdit){
            $scope.showEditOther = false;
            $scope.isEditting = true;
            edittingIndex = index;
            var fetchedOffense = Offenses.findById(index);
            offense = fetchedOffense;
            resetFields();
            $scope.showMenu = false;
            $scope.showQuestions = true;
            $scope.questions = Questions.getQuestions(fetchedOffense.type);
            if(fetchedOffense.type === "Other"){
                $scope.showSearch = true;
                $scope.showEditOther = true;
                $scope.editOtherDescription = fetchedOffense.description;
            }

            for (var key in fetchedOffense) {
                if (fetchedOffense.hasOwnProperty(key)) {
                    var keyIndexes = {
                        'licence': 0,
                        'age': 1,
                        'road': 2,
                        'speed_limit': 3,
                        'driver': 2,
                        'intoxication': 3,
                        'blood_test': 2
                    }
                    var index = -1;
                    if (keyIndexes.hasOwnProperty(key)) {
                        index = keyIndexes[key];
                    }
                    if(index != -1){
                        if(offense[key] === -1){
                            $scope.questions[index].name = TranslateService.englishToDutch(key);
                        }
                        else{
                            $scope.questions[index].name = Questions.getQuestionsForField(key)[fetchedOffense[key]];
                        }
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
    $scope.returnTrue = function(index){
        if(index === $scope.questions.length -1){
            return true;
        }
        if(index === indexShown){
            return true;
        }
        else{
            return false;
        }
    }
    $scope.scrollBottom = function(){
        $scope.test = false;
    };
    $scope.submitEdit = function(){
        $scope.showQuestions = false;
        $scope.showInput = false;
        $scope.isEditting = false;
        $scope.showEditOther = false;
        $scope.showSearch = false;
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
                $scope.showMenu = true;
            }
            else{
                if(offense.type != ""){
                    if(offense.type === "Speed"){
                        var input = $scope.inputs.speed_driven;
                        var speedDriven = parseInt(input);
                        var speedCorrected = Formulas.getCorrectedSpeed(speedDriven);
                        var speedLimit = (offense.speed_limit+1) * 10;
                        if(speedCorrected <= speedLimit){
                            $ionicPopup.alert({
                                title: 'INFORMATIE',
                                template: 'De gecorrigeerde snelheid kan niet lager zijn dan snelheidslimiet. Gelieve opnieuw te proberen.'
                            });
                        }
                        else{
                            addCurrOffense();
                            addDummyOffense();
                            resetFields();
                            $scope.showMenu = true;
                        }
                    }
                    else{
                        addCurrOffense();
                        addDummyOffense();
                        resetFields();
                        $scope.showMenu = true;
                    }
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
                        Offenses.remove(index);
                        resetFields();
                        $scope.showMenu = false;
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
        var valid = true;
        if($scope.isEditting){
            valid = false;
            $ionicPopup.alert({
                title: 'INFORMATIE',
                template: 'Gelieve het aanpassen van uw overtreding te vervolledigen'
            });
        }
        else{
            if(offense != null){
                if(offense.type != ""){
                    if(Utils.validateOffense(offense)){
                        Offenses.add(offense);
                        resetFields();
                        offense = null;
                    }
                    else{
                        valid = false;
                    }
                }
            }

            var offenses = Offenses.all();
            if(offenses.length === 0){
                valid = false;
            }

            for (var i = 0; i < offenses.length; i++) {
                var fOffense = offenses[i];
                if(!Utils.validateOffense(fOffense)){
                    valid = false;
                }
            }
            if(!valid){
                $ionicPopup.alert({
                    title: 'INFORMATIE',
                    template: 'Gelieve alle velden van een antwoord te voorzien'
                });
            }
            else{
                if(offenses.length === 1){
                    $location.path("/result/0");
                }
                else{
                    $location.path("/result");
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
    $scope.search = function() {
        offense.age = 0;
        offense.licence = 0;
        $scope.searchResults.length = 0;
        $scope.showQuestions = false;
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
        if($scope.isEditting){
            $scope.showSearch = true;
            $scope.searchResults.length = 0;
            $scope.showMenu = false;
            $scope.showQuestions = true;
            $scope.showEditOther = true;
            offense.id = item.id;
            offense.degree = item.degree;
            offense.description = item.description;
            $scope.editOtherDescription = item.description;

            $scope.offenses.splice(edittingIndex, 1, offense);
        }
        else{
            $ionicScrollDelegate.scrollTop();
            $scope.searchResults.length = 0;
            $scope.searchResults.push(item);
            offense.id = item.id;
            offense.degree = item.degree;
            offense.description = item.description;
            $scope.showQuestions = true;
        }
    };
    $scope.isGroupShown = function(index) {
        return indexShown === index;
    };
    function addDummyOffense(){
        offense = {type: ""};
        $scope.offenses.push(offense);
    }

    function addCurrOffense(){
        Offenses.add(offense);
        return true;
    }

    function resetFields(){
        indexShown = 0;
        $scope.showQuestions = false;
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
            console.log(key + " -> " + fines[key]);
            if (fines.hasOwnProperty(key)) {
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
            console.log(res.item(i).id);
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
                $scope.addPhoto();
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
